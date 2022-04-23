import { createSlice, ActionCreatorsMapObject, PayloadAction } from '@reduxjs/toolkit';
import { useRedux, Selector } from 'hooks/useRedux';
import { RootState } from 'models/store';

interface UIEffectState {
  dropDown: {
    isOpen: boolean;
  };
  modal: {
    isOpen: boolean;
  };
}

const initialState: UIEffectState = {
  dropDown: {
    isOpen: false,
  },
  modal: {
    isOpen: false,
  },
};

/* createSlice: A function that accepts an initial state, 
an object full of reducer functions, and a "slice name", 
and automatically generates action creators and action 
types that correspond to the reducers and state. */

const UIEffectSlice = createSlice({
  name: 'uiEffect',
  initialState,
  reducers: {
    changeUIEffect(state: UIEffectState, action: PayloadAction<{ uiKey: keyof UIEffectState; value: boolean }>) {
      state[action.payload.uiKey].isOpen = action.payload.value;
    },
  },
});

type ActionMap = typeof UIEffectSlice.actions;

const UIEffectStateSelector: Selector<UIEffectState> = (state: RootState) => state.uiEffect;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
const UIEffectActionCreators: ActionCreatorsMapObject = UIEffectSlice.actions;

export const useUIEffect = () => useRedux<UIEffectState, ActionMap>(UIEffectStateSelector, UIEffectActionCreators);

export default UIEffectSlice.reducer;
