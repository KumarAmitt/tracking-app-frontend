import { combineReducers } from 'redux';
import registrationReducer from './slicers/userRegistration';
import loginReducer from './slicers/userLogin';
import logoutReducer from './slicers/userLogout';
import sessionReducer from './slicers/userSession';

export default combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  logout: logoutReducer,
  session: sessionReducer,
});
