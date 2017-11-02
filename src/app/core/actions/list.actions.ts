import { Action } from '@ngrx/store';

export const GET_LISTS = '[List] get movie lists';

export class GetLists implements Action {
    readonly type = GET_LISTS;
}

export type Actions = GetLists;
