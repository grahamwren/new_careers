import get from 'lodash/get';
import { getCurrentUserId } from '../api';

export const getUser = (state, { userId }) => get(state, `users.data.${userId}`);
export const getCurrentUser = state => getUser(state, {
  userId: getCurrentUserId(state)
});
