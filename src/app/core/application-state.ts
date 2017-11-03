import { Action, ActionReducer, ActionReducerMap, MetaReducer, } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromList from './reducers/list.reducer';
import * as fromSearch from './reducers/search.reducer';

export interface State {
    lists: fromList.State;
    search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
    lists: fromList.reducer,
    search: fromSearch.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

// Search
export const getSearchState = (state: State) => state.search;
export const getSearchRestuls = createSelector(getSearchState, fromSearch.getSearchRestulsMovies);
export const getSearchError = createSelector(getSearchState, fromSearch.getSearchResultsError);
export const getSelection = createSelector(getSearchState, fromSearch.getSelection);

// Lists
export const getListState = (state: State) => state.lists;
export const getMovieLists = createSelector(getListState, fromList.getMovieLists);
export const getSelectedList = createSelector(getListState, fromList.getSelectedList);
