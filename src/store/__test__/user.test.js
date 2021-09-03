import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import {
  registerUser, loginUser, loadSession, logoutUser, getUserInfo, getUserLoadingStatus,
} from '../slicers/user';

describe('Existing user Login', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const userSlice = () => store.getState().user;

  const registrationCredentials = {
    user: {
      username: 'user1',
      password: 'asdf',
      password_confirmation: 'asdf',
    },
  };

  const registrationResponse = {
    status: 200,
    logged_in: true,
    username: 'user1',
  };

  describe('New user registration', () => {
    describe('registerUser', () => {
      it('should return the created user on successful registration', async () => {
        fakeAxios.onPost('/registrations').reply(200, registrationResponse);

        await store.dispatch(registerUser(registrationCredentials));

        expect(userSlice().info.status).toBe(200);
      });

      it('should NOT create the user if server detect unexpected credentials', async () => {
        fakeAxios.onPost('/registrations').reply(500);

        await store.dispatch(registerUser(registrationCredentials));

        expect(userSlice().info).toMatchObject({});
      });
    });
  });

  describe('Existing user login', () => {
    const loginCredentials = {
      user: {
        username: 'user1',
        password: 'asdf',
      },
    };

    const loginResponse = {
      status: 200,
      logged_in: true,
      username: 'user1',
    };

    describe('loginUser', () => {
      it('should return login information on successful login', async () => {
        fakeAxios.onPost('/sessions').reply(200, loginResponse);

        await store.dispatch(loginUser(loginCredentials));

        expect(userSlice().info.status).toBe(200);
      });

      it('should NOT perform login operation on Network error', async () => {
        fakeAxios.onPost('/sessions').reply(500);

        await store.dispatch(loginUser(loginCredentials));

        expect(userSlice().info).toMatchObject({});
      });
    });

    describe('Current user session', () => {
      describe('loadSession', () => {
        it('should return logged_in as TRUE if session is created', async () => {
          fakeAxios.onGet('/sessions').reply(200, { logged_in: true });

          await store.dispatch(loadSession());

          expect(userSlice().info.logged_in).toBeTruthy();
        });

        it('should return logged_in as FALSE if session is destroyed', async () => {
          fakeAxios.onGet('/sessions').reply(200, { logged_in: false });

          await store.dispatch(loadSession());

          expect(userSlice().info.logged_in).toBeFalsy();
        });

        it('should return empty object is network error found', async () => {
          fakeAxios.onGet('/sessions').reply(500);

          await store.dispatch(loadSession());

          expect(userSlice().info).toMatchObject({});
        });
      });
    });

    describe('Logout action', () => {
      it('should logout the current user with status code 200', async () => {
        fakeAxios.onDelete('/sessions').reply(200, { status: 200, logged_in: false });

        await store.dispatch(logoutUser());

        expect(userSlice().info.status).toBe(200);
        expect(userSlice().info.logged_in).toBeFalsy();
      });

      it('should NOT logout the user if network error found', async () => {
        fakeAxios.onDelete('/logout').reply(500);

        await store.dispatch(logoutUser());

        expect(userSlice().info).toMatchObject({});
      });
    });
  });

  describe('loading Indicator', () => {
    it('should return true while creating new user', () => {
      fakeAxios.onPost('/registrations').reply(() => {
        expect(userSlice().loading).toBe(true);
        return [200, registrationResponse];
      });
      store.dispatch(registerUser(registrationCredentials));
    });

    it('should be false after loading session', async () => {
      fakeAxios.onGet('/sessions').reply(200, { logged_in: true });

      await store.dispatch(loadSession());

      expect(userSlice().loading).toBe(false);
    });

    it('should be false if session loading failed', async () => {
      fakeAxios.onGet('/logged_in').reply(500);

      await store.dispatch(loadSession());

      expect(userSlice().loading).toBe(false);
    });
  });

  describe('selectors', () => {
    const createState = () => ({
      user: {
        info: {},
        loading: false,
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getUserInfo', () => {
      it('returns the username with status code and logged_in key when user is created', () => {
        state.user.info = { status: 200, logged_in: true, username: 'user1' };

        const result = getUserInfo(state);
        expect(result.status).toBe(200);
        expect(result.logged_in).toBeTruthy();
        expect(result.username).toBe('user1');
      });
    });

    describe('getUserLoadingStatus', () => {
      it('return TRUE if loading state is true', () => {
        state.user.loading = true;
        const result = getUserLoadingStatus(state);
        expect(result).toBeTruthy();
      });
      it('return FALSE if loading state is true', () => {
        const result = getUserLoadingStatus(state);
        expect(result).toBeFalsy();
      });
    });
  });
});
