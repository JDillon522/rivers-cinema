import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const SUBMIT_SEARCH = '[Search] Search for a term';
export const SUBMIT_SEARCH_SUCCESS = '[Search] Search successful';
export const SUBMIT_SEARCH_ERROR = '[Search] Search returned an error';
export const SEARCH_MOVIE = '[Search] Search for a movie by ID';
export const SEARCH_MOVIE_SUCCESS = '[Search] Successfully searched for a movie by ID';
export const ADD_TO_SELECTION = '[Search] Add a movie from search to the temp collection';
export const REMOVE_FROM_SELECTION = '[Search] Remove a movie from the temp collection';
export const CLEAR_SEARCH = '[Search] Clear all the data';

export class SubmitSearch implements Action {
    readonly type = SUBMIT_SEARCH;
    constructor(private payload: string) { }
}

export class SubmitSearchSuccess implements Action {
    readonly type = SUBMIT_SEARCH_SUCCESS;
    constructor(private payload?) { }
}

export class SubmitSearchError implements Action {
    readonly type = SUBMIT_SEARCH_ERROR;
    constructor(private payload?) { }
}

export class SearchMovie implements Action {
    readonly type = SEARCH_MOVIE;
    constructor(private payload: string) { }
}

export class SearchMovieSuccess implements Action {
    readonly type = SEARCH_MOVIE_SUCCESS;
    constructor(private payload: Movie) { }
}

export class AddToSelection implements Action {
    readonly type = ADD_TO_SELECTION;
    constructor(private payload: Movie) { }
}

export class RemoveFromSelection implements Action {
    readonly type = REMOVE_FROM_SELECTION;
    constructor(private payload: Movie) { }
}

export class ClearSearch implements Action {
    readonly type = CLEAR_SEARCH;
}

export type Actions
    = SubmitSearch
    | SubmitSearchSuccess
    | SubmitSearchError
    | SearchMovie
    | SearchMovieSuccess
    | AddToSelection
    | RemoveFromSelection
    | ClearSearch;
