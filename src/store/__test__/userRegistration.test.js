import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getRegistrationProgress, getRegistrationStatus, registerUser } from '../slicers/userRegistration';

describe('New User Registration', () => {
  describe('Registering NEW user', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const registrationSlice = () => store.getState().entities.auth.registration;

    const registrationCredentials = {
      user: {
        username: 'user1',
        password: 'asdf',
        password_confirmation: 'asdf',
      },
    };

    const registrationSuccess = {
      status: 'created',
      user: {
        id: 1,
        username: 'user1',
        password_digest: 'password',
      },
    };
    describe('registerUser', () => {
      it('should return the created user on successful registration', async () => {
        fakeAxios.onPost('/registrations').reply(200, registrationSuccess);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().registration.status).toBe('created');
      });

      // it('should NOT create the user if server detect unexpected credentials', async () => {
      //   fakeAxios.onPost('/registrations').reply(500);
      //
      //   await store.dispatch(registerUser(registrationCredentials));
      //
      //   expect(registrationSlice().registration).toHaveProperty('error');
      // });
    });

    describe('loading Indicator', () => {
      it('should return true while creating new user', async () => {
        fakeAxios.onPost('/registrations').reply(() => {
          expect(registrationSlice().loading).toBe(true);
          return [200, registrationSuccess];
        });
        await store.dispatch(registerUser(registrationCredentials));
      });

      it('should be false after creating new user', async () => {
        fakeAxios.onPost('/registrations').reply(200, registrationSuccess);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().loading).toBe(false);
      });

      it('should be false if server error detected', async () => {
        fakeAxios.onPost('/registrations').reply(500);

        await store.dispatch(registerUser(registrationCredentials));

        expect(registrationSlice().loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    const createState = () => ({
      entities: {
        auth: {
          registration: {
            registration: {},
            loading: false,
          },
        },
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getRegistrationStatus', () => {
      it('should return TRUE if user is registered successfully with status of "created" ', () => {
        state.entities.auth.registration.registration = { status: 'created' };

        const result = getRegistrationStatus(state);

        expect(result).toBeTruthy();
      });
      it('should return FALSE for unsuccessful registration', () => {
        state.entities.auth.registration.registration = {};

        const result = getRegistrationStatus(state);

        expect(result).toBeFalsy();
      });
    });

    describe('getRegistrationProgress', () => {
      it('return TRUE if loading state is true', () => {
        state.entities.auth.registration.loading = true;
        const result = getRegistrationProgress(state);
        expect(result).toBeTruthy();
      });
      it('return FALSE if loading state is true', () => {
        const result = getRegistrationProgress(state);
        expect(result).toBeFalsy();
      });
    });
  });
});
