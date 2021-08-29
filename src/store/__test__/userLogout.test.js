import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { logoutUser } from '../slicers/userLogout';

describe('User Logout', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const logoutSlice = () => store.getState().entities.auth.logout;

  const logoutSuccess = {
    status: 200,
    logged_out: true,
  };

  describe('logout operation', () => {
    it('should set logged_out true on successful logout', async () => {
      fakeAxios.onDelete('/logout').reply(200, logoutSuccess);

      await store.dispatch(logoutUser());

      expect(logoutSlice().logout.loggedOut).toBe(true);
    });

    it('should return a status code of 200 on successful logout', async () => {
      fakeAxios.onDelete('/logout').reply(200, logoutSuccess);

      await store.dispatch(logoutUser());

      expect(logoutSlice().logout.status).toBe(200);
    });

    it('should NOT logout the user if network error found', async () => {
      fakeAxios.onDelete('/logout').reply(500);

      await store.dispatch(logoutUser());

      expect(logoutSlice().logout).toMatchObject({});
    });
  });
});
