import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    productRequested: (state, action) => {
      state.loading = true;
    },
    productsReceived: (state, action) => {
      state.products = action.payload.products
      state.loading = false;
    },
    productRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { productRequested, productsReceived, productRequestFailed } = productSlice.actions;
export default productSlice.reducer;

// ACTION CREATOR

export const loadProducts = () => apiCallBegan({
  url: '/products',
  withCredentials: true,
  onStart: productRequested.type,
  onSuccess: productsReceived.type,
  onError: productRequestFailed.type,
});

// SELECTOR

export const getProducts = createSelector(
  (state) => state.entities.product.products,
  (products) => products,
);
