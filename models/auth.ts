import { createSlice, createAsyncThunk, ActionCreatorsMapObject, PayloadAction } from '@reduxjs/toolkit';
import { signWithThirdParty, ThirdParty } from 'firebaseConfig/firebaseAuth';
import { createUser } from 'firebaseConfig/firebaseStore';
import { useRedux, Selector, DefaultActionMap } from 'hooks/useRedux';
import { RootState } from 'models/store';
import { chatActionCreators } from 'models/chat';
import { status } from 'utils/status';
import { signUp as signUpFunc, signIn as signInFunc, SignUpDataType, SignInDataType } from 'apis/auth.api';

type UserInfo = {
  id: string;
  name: string;
  photo: string;
  email: string;
  password: string;
};

type AuthInput = {
  emailInput: string;
  passwordInput: string;
};

type AuthStatus = {
  isSignIn: boolean;
  isSignUp: boolean;
  fetchStatus: status;
  error: string;
};

interface AuthState {
  user: UserInfo;
  authInput: AuthInput;
  authStatus: AuthStatus;
}

const initialState: AuthState = {
  user: {
    id: '',
    name: '',
    photo: '',
    email: '',
    password: '',
  },
  authInput: {
    emailInput: '',
    passwordInput: '',
  },
  authStatus: {
    isSignIn: false,
    isSignUp: false,
    fetchStatus: status.idle,
    error: '',
  },
};

/* createAsyncThunk<ReturnedType, params, thunkAPIType> */
const signUp = createAsyncThunk<SignUpDataType | string, void, { state: RootState }>(
  'auth/signUp',
  async (_, thunkAPI) => {
    const {
      auth: {
        authInput: { emailInput: email, passwordInput: password },
      },
    } = thunkAPI.getState();
    const data = await signUpFunc({ email, password });

    if (typeof data !== 'string') {
      await createUser(data.localId, data.userName); // 將資料也存到 firestore
    }

    return data;
  }
);

const signIn = createAsyncThunk<SignInDataType | string, void, { state: RootState }>(
  'auth/signIn',
  async (_, thunkAPI) => {
    const {
      auth: {
        authInput: { emailInput: email, passwordInput: password },
      },
    } = thunkAPI.getState();

    const data = await signInFunc({ email, password });

    /* signIn success */
    if (typeof data !== 'string') {
      localStorage.setItem('uid', data.localId);
      const expiredTime = new Date().getTime() + +data.expiresIn * 1000;
      localStorage.setItem('expiredTime', expiredTime.toString());
      localStorage.setItem('userName', data.userName);
    }

    return data;
  }
);

type SignInWithThirdPartyReturnType =
  | (Pick<SignInDataType, 'localId' | 'refreshToken' | 'userName'> & { userPhoto: string })
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
    const uid = user.uid;
    const expiredTime = new Date().getTime() + 3600 * 1000; // expiredIn = 1 hour

    localStorage.setItem('uid', uid);
    localStorage.setItem('expiredTime', expiredTime.toString());
    localStorage.setItem('userName', user.displayName!);
    localStorage.setItem('userPhoto', user.photoURL!);

    const data = {
      localId: uid,
      refreshToken: user.refreshToken,
      userName: user.displayName!,
      userPhoto: user.photoURL!,
    };

    await createUser(uid, user.displayName!); // 將資料也存到 firestore

    return data;
  }
);

const logOut = createAsyncThunk<void, void, { state: RootState }>('auth/logOut', async (_, thunkAPI) => {
  const {
    chat: { ws },
  } = thunkAPI.getState();

  if (ws) ws.close();

  thunkAPI.dispatch(chatActionCreators.setWebSocket(undefined));
});

const thunks = {
  signUp,
  signIn,
  signInWithThirdParty,
  logOut,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<{ type: 'emailInput' | 'passwordInput'; value: string }>) {
      state.authInput[action.payload.type] = action.payload.value;
    },
    checkIsSignIn(state) {
      const uid = localStorage.getItem('uid');
      const userName = localStorage.getItem('userName');
      const userPhoto = localStorage.getItem('userPhoto');
      if (uid && userName) {
        state.authStatus.isSignIn = true;
        state.user.name = userName;
        state.user.id = uid;

        if (userPhoto) state.user.photo = userPhoto;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.authStatus.fetchStatus = status.loading;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.authStatus.fetchStatus = status.error;
          state.authStatus.error = action.payload;
          state.authInput.emailInput = '';
          state.authInput.passwordInput = '';
        } else {
          state.authStatus.fetchStatus = status.idle;
          state.authStatus.isSignUp = true;
        }
      })
      .addCase(signIn.pending, (state) => {
        state.authStatus.isSignUp = false;
        state.authStatus.fetchStatus = status.loading;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.authStatus.fetchStatus = status.error;
          state.authStatus.error = action.payload;
          state.authInput.emailInput = '';
          state.authInput.passwordInput = '';
        } else {
          state.authStatus.fetchStatus = status.idle;
          state.user.id = action.payload.localId;
          state.authStatus.isSignIn = true;
          state.user.name = action.payload.userName;
        }
      })
      .addCase(signInWithThirdParty.pending, (state) => {
        state.authStatus.isSignUp = false;
        state.authStatus.fetchStatus = status.loading;
      })
      .addCase(signInWithThirdParty.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          state.authStatus.fetchStatus = status.error;
          state.authStatus.error = action.payload;
          state.authInput.emailInput = '';
          state.authInput.passwordInput = '';
        } else {
          state.authStatus.fetchStatus = status.idle;
          state.user.id = action.payload.localId;
          state.authStatus.isSignIn = true;
          state.user.name = action.payload.userName;
          state.user.photo = action.payload.userPhoto;
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user.id = '';
        state.authStatus.isSignIn = false;
        localStorage.removeItem('uid');
        localStorage.removeItem('expiredTime');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhoto');
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
