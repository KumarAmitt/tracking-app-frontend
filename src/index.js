// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import configureAppStore from './store/configureStore';
// import App from './App/App';
// import './index.css';
//
// const store = configureAppStore();
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );

//-----------------------------------

import configureAppStore from './store/configureStore';
import { loadProducts } from './store/slicers/product';

const store = configureAppStore();

store.dispatch(loadProducts());
