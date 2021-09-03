import { combineReducers } from 'redux';
import userReducer from './slicers/user';
import productReducer from './slicers/product';
import dealReducer from './slicers/deal';

export default combineReducers({
  user: userReducer,
  product: productReducer,
  deal: dealReducer,
});
