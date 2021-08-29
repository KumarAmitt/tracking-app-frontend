import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registration: {},
    loading: false,
  },
  reducers: {
    registrationInitiated: (state, action) => {
      state.loading = true;
    },
    userRegistered: (state, action) => {
      state.registration.id = action.payload.user.id;
      state.registration.username = action.payload.user.username;
      state.registration.password = action.payload.user['password_digest'];
      state.registration.status = action.payload.status;
      state.loading = false;
    },
    registrationFailed: (state, action) => {
      state.registration.error = action.payload;
      state.loading = false;
    },
  },
});
/* eslint-enable */

const { userRegistered, registrationInitiated, registrationFailed } = registrationSlice.actions;
export default registrationSlice.reducer;

// ACTION CREATOR

export const registerUser = (user) => apiCallBegan({
  url: '/registrations',
  method: 'post',
  data: user,
  withCredentials: true,
  onStart: registrationInitiated.type,
  onSuccess: userRegistered.type,
  onError: registrationFailed.type,
});

// SELECTOR

export const getRegistrationStatus = createSelector(
  (state) => state.entities.auth.registration.registration.status,
  (status) => status === 'created',
);

export const getRegistrationInfo = createSelector(
  (state) => state.entities.auth.registration.registration,
  (registration) => (registration.status === 'created' ? registration : false),
);

export const getRegistrationProgress = createSelector(
  (state) => state.entities.auth.registration.loading,
  (loading) => loading,
);
