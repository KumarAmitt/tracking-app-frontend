import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionInfo: {},
    loading: false
  },
  reducers: {
    sessionRequested: (state, action) => {
      state.loading = true;
    },
    userLoggedInStatus: (state, action) => {
      state.sessionInfo.logged_in = action.payload.logged_in
      if(action.payload.logged_in){
        state.sessionInfo.id = action.payload.user.id
        state.sessionInfo.username = action.payload.user.username
        state.sessionInfo.password = action.payload.user['password_digest']
      }
      state.loading = false;
    },
    sessionFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { userLoggedInStatus, sessionRequested, sessionFailed } = sessionSlice.actions;
export default sessionSlice.reducer;

// ACTION CREATOR

export const checkLoginStatus = () => apiCallBegan({
  url: '/logged_in',
  withCredentials: true,
  onStart: sessionRequested.type,
  onSuccess: userLoggedInStatus.type,
  onError: sessionFailed.type,
});

// SELECTOR

export const getSessionInfo = createSelector(
    (state) => state.entities.auth.session.sessionInfo,
    (sessionInfo) => sessionInfo.logged_in ? sessionInfo : false
);
