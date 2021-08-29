import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { loginUser } from '../slicers/userLogin';
import { registerUser } from '../slicers/userRegistration';

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

        await store.dispatch(registerUser(loginCredentials));

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

        await store.dispatch(registerUser(loginCredentials));

        expect(loginSlice().loading).toBe(false);
      });

      it('should be false if server error detected', async () => {
        fakeAxios.onPost('/sessions').reply(500);

        await store.dispatch(registerUser(loginCredentials));

        expect(loginSlice().loading).toBe(false);
      });
    });
  });
});
