import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './slicers/product';
import dealReducer from './slicers/deal';

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  deal: dealReducer,
});
