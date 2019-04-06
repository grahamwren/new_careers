import get from 'lodash/get';
import { getUsers } from '../users';

export const getRoomName = state => get(state, 'chat.roomName');
export const getRooms = state => get(state, 'chat.rooms');
export const getChatOpen = state => get(state, 'chat.chatOpen');
export const getAvailableUsers = (state) => {
  const usersM = getUsers(state);
  if (usersM) {
    return Object.values(usersM).map(user => ({
      label: user.name || user.email,
      value: user.id
    }));
  }
};
export const getMessages = state => get(state, 'chat.messages');
