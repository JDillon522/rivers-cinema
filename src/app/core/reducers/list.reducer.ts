import * as _ from 'lodash';
import * as listActions from '../actions/list.actions';
import { List } from '../models/list';
import { CREATE_LIST } from '../actions/list.actions';
import { dummyList } from '../mock-data';
import { Movie } from '../models/movie';

export interface State {
  lists: { [key: string]: List };
  selectedList: List | null;
  selectedMovie: Movie | null;
}

const initialState: State = {
  lists: {
    'dummy-list': dummyList
  },
  selectedList: dummyList,
  selectedMovie: null
};

export function reducer(state = initialState, action: listActions.Actions): State {
  switch (action.type) {
    case listActions.CREATE_LIST_SUCCESS:
      return handleCreateListSuccess(state, action);

    case listActions.SELECT_LIST_SUCCESS:
      return handleSelectListSuccess(state, action);

    case listActions.SELECT_MOVIE_SUCCESS:
      return handleSelectMovieSuccess(state, action);

    case listActions.DISSELECT_MOVIE:
      return handleDisselectMovie(state, action);

    case listActions.DELETE_MOVIE:
      return handleDeleteMovie(state, action);

    default:
      return state;
  }
}

export function handleCreateListSuccess(state, action) {
  const newStoreState = _.cloneDeep(state);
  const list: List = {
    name: action.payload.name,
    movies: action.payload.movies || {},
    poster: action.payload.poster || '../../assets/img/posterTemplate.jpg',
    numberOfMovies: action.payload.numberOfMovies,
    averageRating: action.payload.averageRating
  };

  if (action.payload.editing) {
    delete newStoreState.lists[action.payload.changedName];
  }

  if (newStoreState.selectedList.name === list.name) {
    newStoreState.selectedList = list;
  }
  newStoreState.lists[list.name] = list;

  return newStoreState;
}

export function handleSelectListSuccess(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.selectedList = newStoreState.lists[action.payload];
  return newStoreState;
}

export function handleSelectMovieSuccess(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.selectedMovie = action.payload;
  return newStoreState;
}

export function handleDisselectMovie(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.selectedMovie = null;
  return newStoreState;
}

export function handleDeleteMovie(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  const list = newStoreState.lists[action.payload.list];
  _.remove(list.movies, movie => movie.imdbID === action.payload.id);

  if (newStoreState.selectedList.name === list.name) {
    _.remove(newStoreState.selectedList.movies, movie => movie.imdbID === action.payload.id);
  }

  newStoreState.lists[list.name] = list;
  return newStoreState;
}

export const getMovieLists = (state: State) => _.values(state.lists);
export const getSelectedList = (state: State) => state.selectedList;
export const getSelectedMovie = (state: State) => state.selectedMovie;
