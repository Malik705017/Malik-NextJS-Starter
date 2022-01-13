import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modal';

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { modal: ModalState; }
export type AppDispatch = typeof store.dispatch;

export default store;
