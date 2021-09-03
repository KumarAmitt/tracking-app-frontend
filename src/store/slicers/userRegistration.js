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
      state.registration = action.payload
      state.loading = false;
    },
    registrationFailed: (state, action) => {
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

export const getRegistrationInfo = createSelector(
  (state) => state.entities.auth.registration.registration,
  (registration) => registration,
);

export const getRegistrationStatus = createSelector(
  (state) => state.entities.auth.registration.registration.status,
  (status) => status === 'created',
);

export const getRegistrationProgress = createSelector(
  (state) => state.entities.auth.registration.loading,
  (loading) => loading,
);
