import { createSlice, ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { useRedux, Selector } from 'hooks/useRedux';
import { RootState } from 'models/store';

interface DropDownState {
  isOpen: boolean;
}

const initialState: DropDownState = {
  isOpen: false,
};

/* createSlice: A function that accepts an initial state, 
an object full of reducer functions, and a "slice name", 
and automatically generates action creators and action 
types that correspond to the reducers and state. */

const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState,
  reducers: {
    openDropDown(state: DropDownState) {
      state.isOpen = true;
    },
    closeDropDown(state: DropDownState) {
      state.isOpen = false;
    },
  },
});

type ActionMap = typeof dropDownSlice.actions;

const DropDownStateSelector: Selector<DropDownState> = (state: RootState) => state.dropDown;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
const DropDownActionCreators: ActionCreatorsMapObject = dropDownSlice.actions;

export const useDropDown = () => useRedux<DropDownState, ActionMap>(DropDownStateSelector, DropDownActionCreators);

export default dropDownSlice.reducer;
