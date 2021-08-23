import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './slicers/product';

export default combineReducers({
  auth: authReducer,
  product: productReducer,
});
