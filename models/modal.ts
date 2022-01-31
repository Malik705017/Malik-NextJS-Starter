import { createSlice, ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { useRedux, Selector } from '../hooks/useRedux';
import { RootState } from './store';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

/* createSlice: A function that accepts an initial state, 
an object full of reducer functions, and a "slice name", 
and automatically generates action creators and action 
types that correspond to the reducers and state. */

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state: ModalState) {
      state.isOpen = true;
    },
    closeModal(state: ModalState) {
      state.isOpen = false;
    },
  },
});

type ActionMap = typeof modalSlice.actions;

const modalStateSelector: Selector<ModalState> = (state: RootState) => state.modal;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
const modalActionCreators: ActionCreatorsMapObject = modalSlice.actions;

export const useModal = () => useRedux<ModalState, ActionMap>(modalStateSelector, modalActionCreators);

export default modalSlice.reducer;
