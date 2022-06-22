import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from 'models/auth';
import scrollReducer from 'models/scroll';
import uiEffectReducer from 'models/uiEffect';
import chatReducer from 'models/chat';

/* https://redux-toolkit.js.org/api/configureStore  */
const store = configureStore({
  reducer: {
    auth: authReducer,
    scroll: scrollReducer,
    uiEffect: uiEffectReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: {
        ignoredActions: ['chat/setWebSocket'],
        ignoredPaths: ['chat.ws'],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { modal: ModalState; }
export type AppDispatch = typeof store.dispatch;

export default store;
