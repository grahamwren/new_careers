import { handleActions } from 'redux-actions';
import { gotJobSearchResults } from './actions';

export default handleActions({
  [gotJobSearchResults]: (state, { payload }) => Object.assign({}, state, payload)
}, {});
