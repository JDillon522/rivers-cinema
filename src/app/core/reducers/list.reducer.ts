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
    case listActions.CREATE_LIST:
      return handleCreateList(state, action);

    case listActions.SELECT_LIST_SUCCESS:
      return handleSelectListSuccess(state, action);

    case listActions.SELECT_MOVIE_SUCCESS:
      return handleSelectMovieSuccess(state, action);

    case listActions.DISSELECT_MOVIE:
      return handleDisselectMovie(state, action);

    default:
      return state;
  }
}

export function handleCreateList(state, action) {
  const newStoreState = _.cloneDeep(state);
  const list: List = {
    name: action.payload.name,
    movies: action.payload.movies || {},
    poster: action.payload.poster || '../../assets/img/posterTemplate.jpg'
  };
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

export const getMovieLists = (state: State) => _.values(state.lists);
export const getSelectedList = (state: State) => state.selectedList;
export const getSelectedMovie = (state: State) => state.selectedMovie;
