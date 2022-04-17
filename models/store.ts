import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import modalReducer from 'models/modal';
import authReducer from 'models/auth';
import scrollReducer from 'models/scroll';

/* https://redux-toolkit.js.org/api/configureStore  */
const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    scroll: scrollReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { modal: ModalState; }
export type AppDispatch = typeof store.dispatch;

export default store;
