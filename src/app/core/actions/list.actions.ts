import { Action } from '@ngrx/store';
import { List } from '../models/list';

export const GET_LISTS = '[List] get movie lists';
export const CREATE_LIST = '[List] create a list';
export const CREATE_LIST_SUCCESS = '[List] create success';
export const SELECT_LIST = '[List] Select a list';
export const GO_TO_LIST = '[List] Navigate to selected list';

export class GetLists implements Action {
    readonly type = GET_LISTS;
}

export class CreateList implements Action {
    readonly type = CREATE_LIST;
    constructor(private payload: List) { }
}

export class CreateListSuccess implements Action {
    readonly type = CREATE_LIST_SUCCESS;
    constructor(private payload?) { }
}

export class SelectList implements Action {
    readonly type = SELECT_LIST;
    constructor(private payload: string) { }
}

export class GoToList implements Action {
    readonly type = GO_TO_LIST;
    constructor(private payload: string) { }
}

export type Actions
    = GetLists
    | CreateList
    | CreateListSuccess
    | SelectList
    | GoToList;
