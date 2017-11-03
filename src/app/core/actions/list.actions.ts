import { Action } from '@ngrx/store';
import { List } from '../models/list';

export const GET_LISTS = '[List] get movie lists';
export const CREATE_LIST = '[List] create a list';
export const CREATE_LIST_SUCCESS = '[List] create success';
export const SELECT_LIST = '[List] Select a list';
export const SELECT_LIST_SUCCESS = '[List] Select a list successfully';
export const SELECT_MOVIE = '[List] Select a movie from a list';
export const SELECT_MOVIE_SUCCESS = '[List] Successfully select a movie from the list';
export const DISSELECT_MOVIE = '[List] Remove the selected movie from the store';
export const DELETE_MOVIE = '[List] Delete a movie from the list';

export class GetLists implements Action {
    readonly type = GET_LISTS;
}

export class CreateList implements Action {
    readonly type = CREATE_LIST;
    constructor(private payload) { }
}

export class CreateListSuccess implements Action {
    readonly type = CREATE_LIST_SUCCESS;
    constructor(private payload?) { }
}

export class SelectList implements Action {
    readonly type = SELECT_LIST;
    constructor(private payload: string) { }
}

export class SelectListSuccess implements Action {
    readonly type = SELECT_LIST_SUCCESS;
    constructor(private payload: string) { }
}

export class SelectMovie implements Action {
    readonly type = SELECT_MOVIE;
    constructor(private payload: string) { }
}

export class SelectMovieSuccess implements Action {
    readonly type = SELECT_MOVIE_SUCCESS;
    constructor(private payload: string) { }
}

export class DisselectMovie implements Action {
    readonly type = DISSELECT_MOVIE;
}

export class DeleteMovie implements Action {
    readonly type = DELETE_MOVIE;
    constructor(private payload: {id: string, list: string}) { }
}

export type Actions
    = GetLists
    | CreateList
    | CreateListSuccess
    | SelectList
    | SelectListSuccess
    | SelectMovie
    | SelectMovieSuccess
    | DisselectMovie
    | DeleteMovie;
