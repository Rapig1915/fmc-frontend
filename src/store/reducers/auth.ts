import { IReduxAction } from '../types';

const initialState = {};

export default (
  state = initialState,
  action: IReduxAction
): typeof initialState => {
  switch (action.type) {
    default:
      return state;
  }
};
