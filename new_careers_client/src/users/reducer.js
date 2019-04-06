import { handleActions } from 'redux-actions';
import keyBy from 'lodash/keyBy';
import { gotUser, gotUsers } from './actions';

export default handleActions({
  [gotUser]: (state, { payload: { data: user } }) => ({
    ...state,
    data: {
      ...state.data,
      [user.id]: user
    }
  }),
  [gotUsers]: (state, { payload }) =>
    ({ ...state, data: keyBy(payload.data, 'id') })
}, {});
