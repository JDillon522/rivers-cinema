import { Action, ActionReducer, ActionReducerMap, MetaReducer, } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromList from './reducers/list.reducer';

export interface State {
    lists: fromList.State;
}

export const reducers: ActionReducerMap<State> = {
    lists: fromList.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
