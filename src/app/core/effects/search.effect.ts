import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../application-state';
import * as SearchActions from '../actions/search.action';
import { SearchService } from '../../services/search/search.service';

@Injectable()
export class SearchEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private searchService: SearchService
    ) {}

    @Effect() submitSearch$: Observable<Action> = this.actions$
        .ofType(SearchActions.SUBMIT_SEARCH)
        .debounceTime(100)
        .concatMap(action => {
            return this.searchService.searchForMovie(action['payload'])
                .mergeMap(response => {
                    const actions = new Set();
                    actions.add(new SearchActions.SubmitSearchSuccess(response));

                    return Array.from(actions);
                })
                .catch(error => {
                    console.error(error);
                    return [];
                });
        });

    @Effect() searchMovie$: Observable<Action> = this.actions$
        .ofType(SearchActions.SEARCH_MOVIE)
        .debounceTime(100)
        .concatMap(action => {
            return this.searchService.getMovieData(action['payload']['imdbID'])
                .mergeMap(response => {
                    const actions = new Set();
                    actions.add(new SearchActions.SearchMovieSuccess(response));

                    return Array.from(actions);
                })
                .catch(error => {
                    console.error(error);
                    return [];
                });
        });

}
