import { handleActions } from 'redux-actions';
import { loggedIn, loggedOut } from './actions';
import api from './client';

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
    api.logout();
    localStorage.removeItem('userId');
    return { ...state, userId: undefined };
  }
}, getInitState());
