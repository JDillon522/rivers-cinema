import { Action } from '@ngrx/store';
import { List } from '../models/list';

export const GET_LISTS = '[List] get movie lists';
export const CREATE_LIST = '[List] create a list';
export const CREATE_LIST_SUCCESS = '[List] create success';

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

export type Actions
    = GetLists
    | CreateList
    | CreateListSuccess;
