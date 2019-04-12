import { handleActions } from 'redux-actions';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import keyBy from 'lodash/keyBy';
import { gotFile, gotFiles, deletedFile } from './actions';

const translateToJS = file => ({
  ...file,
  user_id: undefined,
  userId: file.user_id
});

export default handleActions({
  [gotFile]: (state, { payload }) => {
    const file = translateToJS(payload.data);
    return {
      data: {
        ...(state.data || {}),
        [file.userId]: {
          ...((state.data && state.data[file.userId]) || {}),
          [file.id]: file
        }
      }
    };
  },
  [gotFiles]: (state, { payload }) => {
    const files = payload.data.map(translateToJS);
    const usersFiles = groupBy(files, 'userId');
    return {
      ...state,
      data: mapValues(usersFiles, fs => keyBy(fs, 'id'))
    };
  },
  [deletedFile]: (state, { payload: file }) => ({
    ...state,
    data: {
      ...(state.data || {}),
      [file.userId]: {
        ...((state.data && state.data[file.userId]) || {}),
        [file.id]: undefined
      }
    }
  })
}, {});
