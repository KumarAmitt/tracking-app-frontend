import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { registerUser } from '../slicers/userRegistration';

describe('New User Registration', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const registrationSlice = () => store.getState().entities.auth.registration;

  describe('Registering NEW user', () => {
    const registrationCredentials = {
      user: {
        username: 'user1',
        password: 'asdf',
        password_confirmation: 'asdf',
      },
    };

    const registrationInfo = {
      status: 'created',
      user: {
        id: 1,
        username: 'user1',
        password_digest: 'password',
      },
    };
    describe('registerUser', () => {
      it('should return the created user on successful registration', async () => {
        fakeAxios.onPost('/registrations').reply(200, registrationInfo);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().registration.status).toBe('created');
      });

      it('should NOT create the user if server detect unexpected credentials', async () => {
        fakeAxios.onPost('/registrations').reply(500);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().registration).toHaveProperty('error');
      });
    });

    describe('loading Indicator', () => {
      it('should return true while creating new user', async () => {
        fakeAxios.onPost('/registrations').reply(() => {
          expect(registrationSlice().loading).toBe(true);
          return [200, registrationInfo];
        });
        await store.dispatch(registerUser(registrationCredentials));
      });

      it('should be false after creating new user', async () => {
        fakeAxios.onPost('/registrations').reply(200, registrationInfo);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().loading).toBe(false);
      });

      it('should be false if server error detected', async () => {
        fakeAxios.onPost('/registrations').reply(500);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().loading).toBe(false  );
      });

    });
  });
});
