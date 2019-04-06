import { createAction } from 'redux-actions';

export const enterRoom = createAction('chat/ENTER_ROOM');
export const exitRoom = createAction('chat/EXIT_ROOM');
export const gotRooms = createAction('chat/GOT_ROOMS');
export const gotRoom = createAction('chat/GOT_ROOM');
export const gotMessages = createAction('chat/GOT_MESSAGES');
export const gotMessage = createAction('chat/GOT_MESSAGE');
export const toggleChat = createAction('chat/TOGGLE_CHAT');
