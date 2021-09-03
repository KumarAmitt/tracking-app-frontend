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

//-----------------------
//
// import configureAppStore from './store/configureStore';
// import { loadSession } from './store/slicers/userSession';
// import { loginUser } from './store/slicers/userLogin';
// import {registerUser} from "./store/slicers/userRegistration";
//
// const store = configureAppStore();
//
// store.dispatch(registerUser({
//   user: {
//     username: 'user204',
//     password: 'asdf',
//     password_confirmation: 'asdf'
//   }
// }))

// store.dispatch(loginUser({
//   user: {
//     username: 'user102',
//     password: 'asdf',
//   },
// }));

// store.dispatch(loadSession());
