import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    logout: {},
    loading: false
  },
  reducers: {
    logoutInitiated: (state, action) => {
      state.loading = true;
    },
    userLogout: (state, action) => {
      state.logout.status = action.payload.status
      state.logout.loggedOut = action.payload['logged_out'];
      state.loading = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { userLogout} = logoutSlice.actions;
export default logoutSlice.reducer;

// ACTION CREATOR

export const logoutUser = () => apiCallBegan({
  url: '/logout',
  method: 'delete',
  withCredentials: true,
  onSuccess: userLogout.type,
});