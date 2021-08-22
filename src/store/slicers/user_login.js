import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedInUser: {},
    signInUser: {},
    loading: false,
  },
  reducers: {
    loginInitiated: (state, action) => {
      state.loading = true;
    },
    userLogin: (state, action) => {
      state.signInUser = action.payload;
      if (action.payload.status === 401) {
        state.loggedInUser.status = action.payload.status;
      } else {
        state.loggedInUser.id = action.payload.user.id;
        state.loggedInUser.username = action.payload.user.username;
        state.loggedInUser.status = action.payload.status;
        state.loggedInUser.logged_in = action.payload.logged_in;
      }
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

export const getLoggedInStatus = createSelector(
  (state) => state.entities.auth.login.loggedInUser.status,
  (status) => status === 'created',
);

export const getSignInStatus = createSelector(
  (state) => state.entities.auth.login.signInUser.status,
  (status) => status === 'created',
);

// SELECTOR

export const getLoginInfo = createSelector(
  (state) => state.entities.auth.login.loggedInUser,
  (loggedInUser) => (loggedInUser.status === 'created' ? loggedInUser : false),
);
