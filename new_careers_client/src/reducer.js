import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {apiReducer} from './api';


export default combineReducers({
  api: apiReducer,
  form: formReducer
});