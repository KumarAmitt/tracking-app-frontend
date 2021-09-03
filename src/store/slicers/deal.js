import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
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
      state.loading = false;
    },
    dealReceived: (state, action) => {
      state.deals = action.payload;
      state.loading = false;
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

export const getAllDeals = createSelector(
  (state) => state.deal.deals,
  (deals) => (deals.all ? deals.all : 0),
);

export const getTotalPremium = createSelector(
  (state) => state.deal.deals.progress,
  (progress) => (progress ? progress.sum_premium : 0),
);

export const getProgressReport = createSelector(
  (state) => state.deal.deals.progress,
  (progress) => (progress ? progress.items : 0),
);
