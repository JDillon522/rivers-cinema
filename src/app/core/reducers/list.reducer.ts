import * as listActions from '../actions/list.actions';

export interface State {
  lists: string[];
}

const initialState: State = {
  lists: []
};

export function reducer(state = initialState, action: listActions.Actions): State {
  switch (action.type) {

    default:
      return state;
  }
}
