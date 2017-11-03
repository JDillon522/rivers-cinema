import * as searchActions from '../actions/search.action';
import * as _ from 'lodash';
import { Search } from '../models/search';
import { MovieSearch, Movie } from '../models/movie';

export interface State {
  movies: { [key: string]:  MovieSearch };
  selection: { [key: string]:  MovieSearch };
  error: string;
  movieData: { [key: string]:  Movie }
}

const initialState: State = {
  movies: {},
  selection: {},
  error: '',
  movieData: {}
};

export function reducer(state = initialState, action: searchActions.Actions): State {
  switch (action.type) {

    case searchActions.SUBMIT_SEARCH_SUCCESS:
      return handleSearchResults(state, action);

    case searchActions.SEARCH_MOVIE_SUCCESS:
      return handleSearchMovieSuccess(state, action);

    case searchActions.ADD_TO_SELECTION:
      return handleAddMovieToSelection(state, action);

    case searchActions.REMOVE_FROM_SELECTION:
      return handleRemoveMovieFromSelection(state, action);

    case searchActions.CLEAR_SEARCH:
      return handleClearSearch(state, action);

    case searchActions.PREP_EDIT_LIST:
      return handlePrepEditList(state, action);

    default:
      return state;
  }
}

export function handleSearchResults(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  const res: Search = action.payload;

  if (res.Response === 'True') {
    const movies = _.keyBy(_.take(res.Search, 4), 'imdbID');
    newStoreState.movies = movies;
    newStoreState.error = '';
  } else {
    newStoreState.movies = {};
    newStoreState.error = res.Error;
  }
  return newStoreState;
}

export function handleSearchMovieSuccess(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.movieData[action.payload.imdbID] = action.payload;
  return newStoreState;
}

export function handleAddMovieToSelection(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.selection[action.payload.imdbID] = action.payload;
  delete newStoreState.movies[action.payload.imdbID];
  return newStoreState;
}

export function handleRemoveMovieFromSelection(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.movies[action.payload.imdbID] = action.payload;
  delete newStoreState.selection[action.payload.imdbID];
  return newStoreState;
}

export function handleClearSearch(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.error = '';
  newStoreState.movies = {};
  newStoreState.selection = {};
  return newStoreState;
}

export function handlePrepEditList(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.movies = {};
  newStoreState.selection = _.keyBy(action.payload.movies, 'imdbID');
  newStoreState.movieData = _.keyBy(action.payload.movies, 'imdbID');
  return newStoreState;
}

export const getSearchRestulsMovies = (state: State) => _.values(state.movies);
export const getSearchResultsError = (state: State) => state.error;
export const getSelection = (state: State) => _.values(state.selection);
