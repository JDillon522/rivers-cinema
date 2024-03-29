import { Action, Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../application-state';
import * as ListActions from '../actions/list.actions';
import * as _ from 'lodash';
import { List } from '../models/list';
import { MovieSearch } from '../models/movie';

@Injectable()
export class ListEffects {
    constructor(
        private actions$: Actions,
        private store: Store<fromRoot.State>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    @Effect() selectList$: Observable<Action> = this.actions$
        .ofType(ListActions.SELECT_LIST)
        .withLatestFrom(this.store)
        .concatMap(([action, state]) => {
            const actions = new Set();

            if (state.lists.lists[action['payload']]) {
                actions.add(new ListActions.SelectListSuccess(action['payload']));
                this.router.navigate(['list', action['payload'], 'details']);
            } else {
                this.router.navigate(['dashboard']);
            }
            return Array.from(actions);
        });

    @Effect() selectMovie$: Observable<Action> = this.actions$
        .ofType(ListActions.SELECT_MOVIE)
        .withLatestFrom(this.store)
        .concatMap(([action, state]) => {
            const actions = new Set();
            const listId = state.lists.selectedList.name;
            const movieMatch = _.findIndex(state.lists.selectedList.movies, action['payload']);

            if (movieMatch > -1) {
                actions.add(new ListActions.SelectMovieSuccess(action['payload']));
                this.router.navigate(['list', listId , 'details', 'movie', action['payload'].imdbID]);
            } else {
                // TODO add error handing for wrong list
                this.router.navigate(['list', listId, 'details']);
            }

            return Array.from(actions);
        });

    @Effect() createList$: Observable<Action> = this.actions$
        .ofType(ListActions.CREATE_LIST)
        .withLatestFrom(this.store)
        .concatMap(([action, state]) => {
            const actions = new Set();
            const list = action['payload'].list;
            const movies = [];
            const poster = [];
            let averageRating = 0;

            _.forEach(list.movies, (movie: MovieSearch) => {
                movies.push(state.search.movieData[movie.imdbID]);
                poster.push(state.search.movieData[movie.imdbID].Poster);
                averageRating += parseFloat(state.search.movieData[movie.imdbID].imdbRating);
            });

            const newList: List = {
                name: list.name,
                movies: movies,
                poster: poster,
                averageRating: (averageRating / movies.length).toFixed(2),
                numberOfMovies: movies.length,
                editing: action['payload'].editing,
                changedName: action['payload'].changedName
            };
            actions.add(new ListActions.CreateListSuccess(newList));
            actions.add(new ListActions.SelectList(newList.name));

            return Array.from(actions);
        });
}
