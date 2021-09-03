import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getSessionInfo, loadSession } from '../slicers/userSession';

describe('Current user session', () => {
  describe('session Information', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const sessionSlice = () => store.getState().entities.auth.session;

    describe('loadSession', () => {
      // it('should return logged_in as TRUE if session is created', async () => {
      //   fakeAxios.onGet('/logged_in').reply(200, { logged_in: true });
      //
      //   await store.dispatch(loadSession());
      //
      //   expect(sessionSlice().sessionInfo.logged_in).toBeTruthy();
      // });

      it('should return logged_in as FALSE if session is destroyed', async () => {
        fakeAxios.onGet('/logged_in').reply(200, { logged_in: false });

        await store.dispatch(loadSession());

        expect(sessionSlice().sessionInfo.logged_in).toBeFalsy();
      });

      it('should return empty object is network error found', async () => {
        fakeAxios.onGet('/logged_in').reply(500);

        await store.dispatch(loadSession());

        expect(sessionSlice().sessionInfo).toMatchObject({});
      });
    });

    describe('loading Indicator', () => {
      it('should return true fetching session data', () => {
        fakeAxios.onGet('/logged_in').reply(() => {
          expect(sessionSlice().loading).toBe(true);
          return [200, { logged_in: false }];
        });
        store.dispatch(loadSession());
      });

      it('should be false after loading session', async () => {
        fakeAxios.onGet('/logged_in').reply(200, { logged_in: true });

        await store.dispatch(loadSession());

        expect(sessionSlice().loading).toBe(false);
      });

      it('should be false if session loading failed', async () => {
        fakeAxios.onGet('/logged_in').reply(500);

        await store.dispatch(loadSession());

        expect(sessionSlice().loading).toBe(false);
      });
    });
  });

  describe('selector', () => {
    const createState = () => ({
      entities: {
        auth: {
          session: {
            sessionInfo: {},
            loading: false,
          },
        },
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getSessionInfo', () => {
      it('should return sessionInfo as as object with logged_in set to true if session loaded', () => {
        state.entities.auth.session.sessionInfo = { logged_in: true };

        const result = getSessionInfo(state);

        expect(result.logged_in).toBeTruthy();
      });

      it('should return sessionInfo as as object with logged_in set to false if session destroyed', () => {
        state.entities.auth.session.sessionInfo = { logged_in: false };

        const result = getSessionInfo(state);

        expect(result.logged_in).toBeFalsy();
      });

      it('should return sessionInfo as an empty object id session NOT created', () => {
        state.entities.auth.session.sessionInfo = {};

        const result = getSessionInfo(state);

        expect(result).toMatchObject({});
      });
    });
  });
});
