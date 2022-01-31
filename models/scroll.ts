import { createSlice, ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { useRedux, Selector } from '../hooks/useRedux';
import { RootState } from './store';

interface ScrollState {
  canScroll: boolean;
}

const initialState: ScrollState = {
  canScroll: true,
};

const ScrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    enableScroll(state: ScrollState) {
      state.canScroll = true;
    },
    disableScroll(state: ScrollState) {
      state.canScroll = false;
    },
  },
});

type ActionMap = typeof ScrollSlice.actions;

const ScrollStateSelector: Selector<ScrollState> = (state: RootState) => state.scroll;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
const ScrollActionCreators: ActionCreatorsMapObject = ScrollSlice.actions;

export const useScroll = () => useRedux<ScrollState, ActionMap>(ScrollStateSelector, ScrollActionCreators);

export default ScrollSlice.reducer;
