import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { apiReducer } from './api';
import { jobSearchReducer } from './jobs-search';
import { userReducer } from './users';
import { chatReducer } from './chat';
import { appsReducer } from './apps';
import { filesReducer } from './files';

export default combineReducers({
  api: apiReducer,
  jobSearch: jobSearchReducer,
  users: userReducer,
  chat: chatReducer,
  apps: appsReducer,
  form: formReducer.plugin({
    sendMessage: (state, { type }) => {
      if (type !== '@@redux-form/SET_SUBMIT_SUCCEEDED') return state;
    }
  }),
  files: filesReducer
});
