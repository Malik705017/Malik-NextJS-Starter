import { createSlice, createAsyncThunk, ActionCreatorsMapObject, PayloadAction } from '@reduxjs/toolkit';
import { signWithThirdParty, ThirdParty } from 'firebaseConfig/firebaseAuth';
import { useRedux, Selector, DefaultActionMap } from 'hooks/useRedux';
import { RootState } from 'models/store';
import { status } from 'utils/status';
import { signUp as signUpFunc, signIn as signInFunc, SignUpDataType, SignInDataType } from 'apis/auth.api';

interface AuthState {
  token: string;
  isSignIn: boolean;
  isSignUp: boolean;
  fetchStatus: status;
  userName: string;
  userPhoto: string;
  email: string;
  password: string;
  error: string;
}

const initialState: AuthState = {
  token: '',
  isSignIn: false,
  isSignUp: false,
  fetchStatus: status.idle,
  userName: '',
  userPhoto: '',
  email: '',
  password: '',
  error: '',
};

/* createAsyncThunk<ReturnedType, params, thunkAPIType> 
https://redux-toolkit.js.org/api/createAsyncThunk */
const signUp = createAsyncThunk<SignUpDataType | string, void, { state: RootState }>(
  'auth/signUp',
  // 下方函式稱作 payloadCreator，吃兩個參數：arg & thunkAPI，前者是你的 action function 的參數，只能有一個，比方說一個 id number 或一個 object，後者是提供 dispatch 和 getState 的 thunkAPI
  async (_, thunkAPI) => {
    const {
      auth: { email, password },
    } = thunkAPI.getState();
    const data = await signUpFunc({ email, password });

    return data;
  }
);

const signIn = createAsyncThunk<SignInDataType | string, void, { state: RootState }>(
  'auth/signIn',
  async (_, thunkAPI) => {
    const {
      auth: { email, password },
    } = thunkAPI.getState();

    const data = await signInFunc({ email, password });

    /* signIn success */
    if (typeof data !== 'string') {
      localStorage.setItem('idToken', data.idToken);
      const expiredTime = new Date().getTime() + +data.expiresIn * 1000;
      localStorage.setItem('expiredTime', expiredTime.toString());
      localStorage.setItem('userName', data.userName);
    }

    return data;
  }
);

type SignInWithThirdPartyReturnType =
  | (Pick<SignInDataType, 'idToken' | 'refreshToken' | 'userName'> & { userPhoto: string })
  | string;

const signInWithThirdParty = createAsyncThunk<SignInWithThirdPartyReturnType, ThirdParty, { state: RootState }>(
  'auth/signInWithThirdParty',
  async (thirdParty: ThirdParty) => {
    const response = await signWithThirdParty(thirdParty);

    // signIn failed
    if (typeof response === 'string') {
      return response;
    }

    // signIn success
    const user = response;
    const idToken = await user.getIdToken();
    const expiredTime = new Date().getTime() + 3600 * 1000; // expiredIn = 1 hour

    localStorage.setItem('idToken', idToken);
    localStorage.setItem('expiredTime', expiredTime.toString());
    localStorage.setItem('userName', user.displayName!);
    localStorage.setItem('userPhoto', user.photoURL!);

    const data = {
      idToken,
      refreshToken: user.refreshToken,
      userName: user.displayName!,
      userPhoto: user.photoURL!,
    };

    return data;
  }
);

const thunks = {
  signUp,
  signIn,
  signInWithThirdParty,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<{ type: 'email' | 'password'; value: string }>) {
      state[action.payload.type] = action.payload.value;
    },
    checkIsSignIn(state) {
      const token = localStorage.getItem('idToken');
      const userName = localStorage.getItem('userName');
      const userPhoto = localStorage.getItem('userPhoto');
      if (token && userName) {
        state.isSignIn = true;
        state.userName = userName;
        state.token = token;

        if (userPhoto) state.userPhoto = userPhoto;
      }
    },
    logOut(state) {
      state.token = '';
      state.isSignIn = false;
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiredTime');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhoto');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.fetchStatus = status.loading;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.fetchStatus = status.error;
          state.error = action.payload;
          state.email = '';
          state.password = '';
        } else {
          state.fetchStatus = status.idle;
          state.isSignUp = true;
        }
      })
      .addCase(signIn.pending, (state) => {
        state.isSignUp = false;
        state.fetchStatus = status.loading;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.fetchStatus = status.error;
          state.error = action.payload;
          state.email = '';
          state.password = '';
        } else {
          state.fetchStatus = status.idle;
          state.token = action.payload.idToken;
          state.isSignIn = true;
          state.userName = action.payload.userName;
        }
      })
      .addCase(signInWithThirdParty.pending, (state) => {
        state.isSignUp = false;
        state.fetchStatus = status.loading;
      })
      .addCase(signInWithThirdParty.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.fetchStatus = status.error;
          state.error = action.payload;
          state.email = '';
          state.password = '';
        } else {
          state.fetchStatus = status.idle;
          state.token = action.payload.idToken;
          state.isSignIn = true;
          state.userName = action.payload.userName;
          state.userPhoto = action.payload.userPhoto;
        }
      });
  },
});

type SliceActionMap = typeof authSlice.actions;
type ThunksActionMap = typeof thunks;
interface ActionMap extends SliceActionMap, ThunksActionMap, DefaultActionMap {}

const authStateSelector: Selector<AuthState> = (state: RootState) => state.auth;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
const authActionCreators: ActionCreatorsMapObject = { ...authSlice.actions, ...thunks };

export const useAuth = () => useRedux<AuthState, ActionMap>(authStateSelector, authActionCreators);

export default authSlice.reducer;
