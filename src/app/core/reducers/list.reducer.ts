import * as _ from 'lodash';
import * as listActions from '../actions/list.actions';
import { List } from '../models/list';
import { CREATE_LIST } from '../actions/list.actions';

export interface State {
  lists: { [key: string]: List };
}

const initialState: State = {
  lists: { }
};

export function reducer(state = initialState, action: listActions.Actions): State {
  switch (action.type) {
    case listActions.CREATE_LIST:
      return handleCreateList(state, action);

    default:
      return state;
  }
}

export function handleCreateList(state, action) {
  const newStoreState = _.cloneDeep(state);
  const list: List = {
    name: action.payload.name,
    movies: action.payload.movies || {}
  };
  newStoreState.lists[list.name] = list;
  return newStoreState;
}

export const getMovieList = (state: State) => _.values(state.lists);
