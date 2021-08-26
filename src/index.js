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
// import { loginUser } from './store/slicers/user_login';
// import { loadSession } from './store/slicers/user_session';
//
// const store = configureAppStore();
//
// store.dispatch(loginUser({
//   user: {
//     username: 'user101',
//     password: 'asdf',
//   },
// }));
//
// store.dispatch(loadSession());

// store.dispatch(logoutUser());

// store.dispatch(createDeal({
//   user_id: 91,
//   product_id: 17,
//   premium: 1100,
//   application_id: 'APL003',
// }));

// store.dispatch(loadDeals());
