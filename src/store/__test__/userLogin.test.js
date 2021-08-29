import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getLoggedInStatus, getLoginProgress, loginUser } from '../slicers/userLogin';

describe('Existing user Login', () => {
  describe('user login action', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const loginSlice = () => store.getState().entities.auth.login;

    const loginCredentials = {
      user: {
        username: 'user1',
        password: 'asdf',
      },
    };

    const loginSuccess = {
      status: 'created',
      logged_in: true,
      user: {
        id: 1,
        username: 'user1',
        password_digest: 'password',
      },
    };

    describe('loginUser', () => {
      it('should return login information on successful login', async () => {
        fakeAxios.onPost('/sessions').reply(200, loginSuccess);

        await store.dispatch(loginUser(loginCredentials));

        expect(loginSlice().loggedInUser.status).toBe('created');
      });

      it('should NOT perform login operation on Network error', async () => {
        fakeAxios.onPost('/sessions').reply(500);

        await store.dispatch(loginUser(loginCredentials));

        expect(loginSlice()).toMatchObject({});
      });
    });

    describe('loading Indicator', () => {
      it('should return true while logging In', () => {
        fakeAxios.onPost('/sessions').reply(() => {
          expect(loginSlice().loading).toBe(true);
          return [200, loginSuccess];
        });
        store.dispatch(loginUser(loginCredentials));
      });

      it('should be false after successful login', async () => {
        fakeAxios.onPost('/sessions').reply(200, loginSuccess);

        await store.dispatch(loginUser(loginCredentials));

        expect(loginSlice().loading).toBe(false);
      });

      it('should be false if server error detected', async () => {
        fakeAxios.onPost('/sessions').reply(500);

        await store.dispatch(loginUser(loginCredentials));

        expect(loginSlice().loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    const createState = () => ({
      entities: {
        auth: {
          login: {
            loggedInUser: {},
            loading: false,
          },
        },
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getLoggedInStatus', () => {
      it('should return TRUE if user logged in successfully with status of "created" ', () => {
        state.entities.auth.login.loggedInUser = { status: 'created' };

        const result = getLoggedInStatus(state);

        expect(result).toBeTruthy();
      });

      it('should return FALSE for unsuccessful login', () => {
        state.entities.auth.login.loggedInUser = {};

        const result = getLoggedInStatus(state);

        expect(result).toBeFalsy();
      });
    });

    describe('getLoginProgress', () => {
      it('return TRUE if loading state is true', () => {
        state.entities.auth.login.loading = true;
        const result = getLoginProgress(state);
        expect(result).toBeTruthy();
      });
      it('return FALSE if loading state is true', () => {
        const result = getLoginProgress(state);
        expect(result).toBeFalsy();
      });
    });
  });
});
