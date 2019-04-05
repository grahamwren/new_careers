import { handleActions } from 'redux-actions';
import { loggedIn, loggedOut } from './actions';

function getInitState() {
  const userId = localStorage.getItem('userId');
  return userId ? {
    userId
  } : {};
}

export default handleActions({
  [loggedIn]: (state, { payload: { data } }) => {
    localStorage.setItem('userId', data.user_id);
    return { ...state, userId: data.user_id };
  },
  [loggedOut]: (state) => {
    localStorage.removeItem('userId');
    return { ...state, userId: undefined };
  }
}, getInitState());
