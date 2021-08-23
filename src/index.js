import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureAppStore from './store/configureStore';
import App from './App/App';
import './index.css';

const store = configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

//-----------------------------------

// import configureAppStore from './store/configureStore';
// import { loadProducts } from './store/slicers/product';
// import {createDeal, loadDeals} from './store/slicers/deal';
// import { loginUser } from './store/slicers/user_login';
// import {logoutUser} from "./store/slicers/user_logout";

// const store = configureAppStore();

// store.dispatch(loginUser({
//   user: {
//     username: 'user101',
//     password: 'asdf',
//   },
// }));

// store.dispatch(logoutUser());

// store.dispatch(createDeal({
//   user_id: 91,
//   product_id: 17,
//   premium: 1100,
//   application_id: 'APL003',
// }));

// store.dispatch(loadDeals());
