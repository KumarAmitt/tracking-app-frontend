import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    logout: {},
    loading: false,
  },
  reducers: {
    logoutInitiated: (state, action) => {
      state.loading = true;
    },
    userLogout: (state, action) => {
      state.logout.status = action.payload.status;
      state.logout.loggedOut = action.payload['logged_out'];
      state.loading = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { userLogout } = logoutSlice.actions;
export default logoutSlice.reducer;

// ACTION CREATOR

export const logoutUser = () => apiCallBegan({
  url: '/logout',
  method: 'delete',
  withCredentials: true,
  onSuccess: userLogout.type,
});

// SELECTOR

export const getLoggedOutStatus = createSelector(
  (state) => state.entities.auth.logout.logout.loggedOut,
  (loggedOut) => loggedOut,
);
