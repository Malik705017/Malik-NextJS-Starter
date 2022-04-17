import { bindActionCreators, ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from 'models/store';

export type Selector<ReturnState> = (s: RootState) => ReturnState;

export type DefaultActionMap = {
  [key: string]: (...params: any[]) => void;
};

type WrapActionDispatch<ActionMap extends DefaultActionMap> = {
  [key in keyof ActionMap]: (...params: Parameters<ActionMap[key]>) => void;
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRedux = <ReturnState, ActionMap extends DefaultActionMap>(
  selector: Selector<ReturnState>,
  actions: ActionCreatorsMapObject
): [ReturnState, WrapActionDispatch<ActionMap>] => {
  const state = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const boundActions = bindActionCreators(actions, dispatch);

  return [state, boundActions as WrapActionDispatch<ActionMap>];
};
