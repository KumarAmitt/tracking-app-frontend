import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionInfo: {},
    loading: false,
  },
  reducers: {
    sessionRequested: (state, action) => {
      state.loading = true;
    },
    userLoggedInStatus: (state, action) => {
      state.sessionInfo = action.payload;
      state.loading = false;
    },
    sessionFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { userLoggedInStatus, sessionRequested, sessionFailed } = sessionSlice.actions;
export default sessionSlice.reducer;

// ACTION CREATOR

export const loadSession = () => apiCallBegan({
  url: '/logged_in',
  withCredentials: true,
  onStart: sessionRequested.type,
  onSuccess: userLoggedInStatus.type,
  onError: sessionFailed.type,
});

// SELECTOR

export const getSessionInfo = createSelector(
  (state) => state.entities.auth.session.sessionInfo,
  (sessionInfo) => sessionInfo,
);
