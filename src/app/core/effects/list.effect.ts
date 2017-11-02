import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../application-state';
import * as ListActions from '../actions/list.actions';

@Injectable()
export class ListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private router: Router
    ) {}

    @Effect() goToList$: Observable<Action> = this.actions$
        .ofType(ListActions.GO_TO_LIST)
        .concatMap(action => {
            const actions = new Set();
            actions.add(new ListActions.SelectList(action['payload']));
            this.router.navigate(['list', action['payload'], 'details']);

            return Array.from(actions);
        });

}
