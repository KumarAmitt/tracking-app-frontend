import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { registerUser, loginUser, loadSession } from '../slicers/user';

describe('Existing user Login', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const userSlice = () => store.getState().entities.user;

  describe('New user registration', () => {
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

          console.log(userSlice());
          expect(userSlice().info.logged_in).toBeFalsy();
        });

        it('should return empty object is network error found', async () => {
          fakeAxios.onGet('/sessions').reply(500);

          await store.dispatch(loadSession());

          expect(userSlice().info).toMatchObject({});
        });
      });
    });
  });
});
