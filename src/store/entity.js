import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './slicers/user';
import productReducer from './slicers/product';
import dealReducer from './slicers/deal';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  deal: dealReducer,
});
