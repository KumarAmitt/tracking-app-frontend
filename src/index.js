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
// // import { registerUser } from './store/slicers/userRegistration';
//
// const store = configureAppStore();
//
// console.log(store.getState());
// store.dispatch(registerUser({
//   user: {
//     username: 'user203',
//     password: 'asdf',
//     password_confirmation: 'asdf',
//   },
// }));
//
// const r = store.getState().entities.auth.registration;
// console.log(r);

// store.dispatch(loginUser({
//   user: {
//     username: 'user103',
//     password: 'asdf',
//   },
// }));

// console.log(d.headers.get('Set-Cookie');

// store.dispatch(loadSession());

// store.dispatch(logoutUser());

// store.dispatch(createDeal({
//   user_id: 91,
//   product_id: 17,
//   premium: 1100,
//   application_id: 'APL003',
// }));

// store.dispatch(loadDeals());
