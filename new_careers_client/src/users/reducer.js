import { handleActions } from 'redux-actions';
import { gotUser, gotUsers } from './actions';

export default handleActions({
  [gotUser]: (state, { payload: { data: user } }) => ({
    ...state,
    data: {
      ...state.data,
      [user.id]: user
    }
  }),
  [gotUsers]: (state, { payload }) => Object.assign({}, state, payload)
}, {});
