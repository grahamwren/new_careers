import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { apiReducer } from './api';
import { jobSearchReducer } from './jobs-search';
import { userReducer } from './users';
import { chatReducer } from './chat';

export default combineReducers({
  api: apiReducer,
  jobSearch: jobSearchReducer,
  users: userReducer,
  chat: chatReducer,
  form: formReducer.plugin({
    sendMessage: (state, {type}) => {
      if (type !== '@@redux-form/SET_SUBMIT_SUCCEEDED') return state;
    }
  })
});
