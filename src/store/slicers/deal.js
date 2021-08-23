import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    newDeal: [],
    deals: [],
    loading: false,
  },
  reducers: {
    dealRequested: (state, action) => {
      state.loading = true;
    },
    dealCreated: (state, action) => {
      state.newDeal = action.payload;
    },
    dealReceived: (state, action) => {
      state.deals = action.payload;
    },
    dealRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const {
  dealRequested, dealCreated, dealReceived, dealRequestFailed,
} = dealSlice.actions;
export default dealSlice.reducer;

// ACTION CREATOR

export const createDeal = (dealInfo) => apiCallBegan({
  url: `/products/${dealInfo.product_id}/deals`,
  method: 'post',
  data: dealInfo,
  withCredentials: true,
  onStart: dealRequested.type,
  onSuccess: dealCreated.type,
  onError: dealRequestFailed.type,
});

export const loadDeals = () => apiCallBegan({
  url: '/deals',
  withCredentials: true,
  onStart: dealRequested.type,
  onSuccess: dealReceived.type,
  onError: dealRequestFailed.type,
});

// SELECTOR

// export const getProducts = createSelector(
//     (state) => state.entities.product.products,
//     (products) => products,
// );
