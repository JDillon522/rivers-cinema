import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../application-state';
import * as ListActions from '../actions/list.actions';

@Injectable()
export class ListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>
    ) {}



}
