import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {},
    loading: false,
  },
  reducers: {
    userRequested: (state, action) => {
      state.loading = true;
    },
    userInfoReceived: (state, action) => {
      state.info = action.payload
      if(action.payload.logged_in === true){
        state.active = true;
      }else{
        state.active = false;
      }

      state.loading = false;
    },
    userRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { userRequested, userInfoReceived, userRequestFailed } = userSlice.actions;
export default userSlice.reducer;

// ACTION CREATOR

export const registerUser = (user) => apiCallBegan({
  url: '/registrations',
  method: 'post',
  data: user,
  withCredentials: true,
  onStart: userRequested.type,
  onSuccess: userInfoReceived.type,
  onError: userRequestFailed.type,
});

export const loginUser = (user) => apiCallBegan({
  url: '/sessions',
  method: 'post',
  data: user,
  withCredentials: true,
  onStart: userRequested.type,
  onSuccess: userInfoReceived.type,
  onError: userRequestFailed.type,
});

export const loadSession = () => apiCallBegan({
  url: '/sessions',
  withCredentials: true,
  onStart: userRequested.type,
  onSuccess: userInfoReceived.type,
  onError: userRequestFailed.type,
});

export const logoutUser = () => apiCallBegan({
  url: '/sessions',
  method: 'delete',
  withCredentials: true,
  onStart: userRequested.type,
  onSuccess: userInfoReceived.type,
  onError: userRequestFailed.type,
});

// SELECTOR

export const getUserInfo = createSelector(
  (state) => state.entities.user.info,
  (info) => info,
);

export const getUserLoadingStatus = createSelector(
  (state) => state.entities.user.loading,
  (loading) => loading,
);
