import get from 'lodash/get';

export const getRoomName = state => get(state, 'chat.roomName');
export const getRooms = state => get(state, 'chat.rooms');
export const getChatOpen = state => get(state, 'chat.chatOpen');
export const getMessages = state => get(state, 'chat.messages');
