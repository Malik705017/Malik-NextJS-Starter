import { createSlice, createAsyncThunk, ActionCreatorsMapObject, PayloadAction } from '@reduxjs/toolkit';
import { useRedux, Selector, DefaultActionMap } from '../hooks/useRedux';
import { RootState } from './store';
import { status } from '../utils/status';
import { signUp as signUpFunc, signIn as signInFunc, SignUpDataType, SignInDataType } from '../apis/auth.api';

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  fetchStatus: status;
  email: string;
  password: string;
  error: string;
}

const initialState: AuthState = {
  token: '',
  isLoggedIn: false,
  fetchStatus: status.idle,
  email: '',
  password: '',
  error: '',
};

/* createAsyncThunk<ReturnedType, params, thunkAPIType> */
const signUp = createAsyncThunk<SignUpDataType | string, void, { state: RootState }>(
  'auth/signUp',
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
      localStorage.setItem('expiresIn', data.expiresIn.toString());
    }

    return data;
  }
);

const thunks = {
  signUp,
  signIn,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeInput(state, action: PayloadAction<{ type: 'email' | 'password'; value: string }>) {
      state[action.payload.type] = action.payload.value;
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
          state.token = action.payload.idToken;
        }
      })
      .addCase(signIn.pending, (state) => {
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
          state.isLoggedIn = true;
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
