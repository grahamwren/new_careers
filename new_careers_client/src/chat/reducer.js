import { handleActions } from 'redux-actions';
import {
  enterRoom,
  exitRoom,
  gotMessage,
  gotMessages,
  gotRoom,
  gotRooms,
  toggleChat
} from './actions';

export default handleActions({
  [enterRoom]: (state, { payload }) => ({ ...state, roomName: payload }),
  [exitRoom]: state => ({ ...state, roomName: undefined }),
  [gotMessages]: (state, { payload }) => ({ ...state, messages: payload }),
  [gotMessage]: (state, { payload }) =>
    ({ ...state, messages: [...(state.messages || []), payload] }),
  [gotRooms]: (state, { payload }) => ({ ...state, rooms: payload }),
  [gotRoom]: (state, { payload }) => ({ ...state, rooms: [...state.rooms, payload] }),
  [toggleChat]: state => ({ ...state, chatOpen: !state.chatOpen })
}, {});
