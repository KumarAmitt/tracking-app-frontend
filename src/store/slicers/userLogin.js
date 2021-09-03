import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedInUser: {},
    loading: false,
  },
  reducers: {
    loginInitiated: (state, action) => {
      state.loading = true;
    },
    userLogin: (state, action) => {
      state.loggedInUser = action.payload
      state.loading = false;
    },
    loginFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { userLogin, loginInitiated, loginFailed } = loginSlice.actions;
export default loginSlice.reducer;

// ACTION CREATOR

export const loginUser = (user) => apiCallBegan({
  url: '/sessions',
  method: 'post',
  data: user,
  withCredentials: true,
  onStart: loginInitiated.type,
  onSuccess: userLogin.type,
  onError: loginFailed.type,
});

// SELECTOR

export const getLoginInfo = createSelector(
  (state) => state.entities.auth.login.loggedInUser,
  (loggedInUser) => loggedInUser,
);

export const getLoggedInStatus = createSelector(
  (state) => state.entities.auth.login.loggedInUser.status,
  (status) => status === 'created',
);

export const getLoginProgress = createSelector(
  (state) => state.entities.auth.login.loading,
  (loading) => loading,
);
