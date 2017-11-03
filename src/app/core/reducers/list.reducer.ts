import * as _ from 'lodash';
import * as listActions from '../actions/list.actions';
import { List } from '../models/list';
import { CREATE_LIST } from '../actions/list.actions';
import { dummyList } from '../mock-data';

export interface State {
  lists: { [key: string]: List };
  selectedList: List | null;
}

const initialState: State = {
  lists: {
    'dummy-list': dummyList
  },
  selectedList: null
};

export function reducer(state = initialState, action: listActions.Actions): State {
  switch (action.type) {
    case listActions.CREATE_LIST:
      return handleCreateList(state, action);

    case listActions.SELECT_LIST:
      return handleSelectList(state, action);

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

export function handleSelectList(state, action) {
  const newStoreState: State = _.cloneDeep(state);
  newStoreState.selectedList = newStoreState.lists[action.payload];
  return newStoreState;
}

export const getMovieLists = (state: State) => _.values(state.lists);
export const getSelectedList = (state: State) => state.selectedList;
