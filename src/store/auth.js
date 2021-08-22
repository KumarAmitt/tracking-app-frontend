import { combineReducers } from 'redux';
import registrationReducer from './slicers/user_registration';
import loginReducer from './slicers/user_login';
import logoutReducer from './slicers/user_logout';
import sessionReducer from './slicers/user_session';

export default combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  logout: logoutReducer,
  session: sessionReducer,
});