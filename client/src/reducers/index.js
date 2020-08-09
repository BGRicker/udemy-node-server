import { combineReducers } from 'redux';
import authReducer from './authReducer';

// represent keys in state object,  names should be clear
export default combineReducers({
  auth: authReducer,
});
