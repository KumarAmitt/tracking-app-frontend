import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import {
  createDeal, getAllDeals, getProgressReport, getTotalPremium, loadDeals,
} from '../slicers/deal';

describe('dealSlice', () => {
  describe('Creating and Loading deals', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const dealSlice = () => store.getState().entities.deal;

    describe('creating deals', () => {
      const newDeal = {
        product_id: 1,
        application_id: 'APL001',
        premium: 5000,
      };

      const dealSuccess = {
        deal: {
          product_id: 1,
          premium: 5000,
          application_id: 'APL001',
        },
      };
      const url = '/products/1/deals';
      describe('createDeal', () => {
        it('should create a new deal successfully', async () => {
          fakeAxios.onPost(url).reply(200, dealSuccess);

          expect(dealSlice().newDeal).toMatchObject([]);
          await store.dispatch(createDeal(newDeal));
          expect(dealSlice().newDeal).toMatchObject({ deal: { product_id: 1, premium: 5000, application_id: 'APL001' } });
        });

        it('should NOT create deal of error occurred', async () => {
          fakeAxios.onPost(url).reply(500);

          await store.dispatch(createDeal(newDeal));

          expect(dealSlice().newDeal).toMatchObject([]);
        });
      });

      describe('loading indicator', () => {
        it('should return true while creating new deal', async () => {
          fakeAxios.onPost(url).reply(() => {
            expect(dealSlice().loading).toBe(true);
            return [200, dealSuccess];
          });
          await store.dispatch(createDeal(newDeal));
        });

        it('should be false after creating new deal', async () => {
          fakeAxios.onPost(url).reply(200, dealSuccess);

          await store.dispatch(createDeal(newDeal));

          expect(dealSlice().loading).toBe(false);
        });

        it('should be false if server error detected', async () => {
          fakeAxios.onPost(url).reply(500);

          await store.dispatch(createDeal(newDeal));

          expect(dealSlice().loading).toBe(false);
        });
      });
    });

    describe('loading deals', () => {
      const deals = {
        all: {
          '2021-08-29': [{ id: 1, product_id: 1, premium: 2000 }],
          '2021-08-30': [{ id: 2, product_id: 4, premium: 2000 }],
        },
        progress: {
          sum_premium: 4000,
          items: {
            Fire: [{ id: 2, product_id: 4, premium: 2000 }],
          },
        },
      };

      describe('loadDeals', () => {
        it('should return all the deals information', async () => {
          fakeAxios.onGet('/deals').reply(200, deals);

          await store.dispatch(loadDeals());

          expect(dealSlice().deals.all['2021-08-29'][0].premium).toBe(2000);
          expect(dealSlice().deals.progress.sum_premium).toBe(4000);
        });

        it('should NOT return deal information when network error detected', async () => {
          fakeAxios.onGet('/deals').reply(500);

          await store.dispatch(loadDeals());

          expect(dealSlice().deals).toMatchObject([]);
        });
      });

      describe('loading indicator', () => {
        it('should return true while fetching deals', () => {
          fakeAxios.onGet('/deals').reply(() => {
            expect(dealSlice().loading).toBe(true);
            return [200, deals];
          });
          store.dispatch(loadDeals());
        });

        it('should be false after fetching deals successfully', async () => {
          fakeAxios.onGet('/deals').reply(200, deals);

          await store.dispatch(loadDeals());

          expect(dealSlice().loading).toBe(false);
        });

        it('should be false if server error detected', async () => {
          fakeAxios.onGet('/deals').reply(500);

          await store.dispatch(loadDeals());

          expect(dealSlice().loading).toBe(false);
        });
      });
    });
  });

  describe('selectors', () => {
    const createState = () => ({
      entities: {
        deal: {
          newDeal: [],
          deals: [],
          loading: false,
        },
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getAllDeals', () => {
      it('should return all the deals information if fetched successfully', () => {
        state.entities.deal.deals.all = {
          '2021-08-29': [{ id: 1, product_id: 1, premium: 2000 }],
          '2021-08-30': [{ id: 2, product_id: 4, premium: 2000 }],
        };
        const result = getAllDeals(state);

        expect(result['2021-08-30']).toHaveLength(1);
      });

      it('should return 0 if the deals > all are not found', () => {
        state.entities.deal.deals = [];

        const result = getAllDeals(state);

        expect(result).toBe(0);
      });
    });

    describe('getTotalPremium', () => {
      it('should return sum of premiums of all the deal if progress object present', () => {
        state.entities.deal.deals.progress = { sum_premium: 4000 };

        const result = getTotalPremium(state);

        expect(result).toBe(4000);
      });

      it('should return 0 if progress data is not available', () => {
        state.entities.deal.deals = [];

        const result = getTotalPremium(state);

        expect(result).toBe(0);
      });
    });

    describe('getProgressReport', () => {
      it('should return all the deal items within progress if available', () => {
        state.entities.deal.deals.progress = {
          items: {
            Fire: [{ id: 2, product_id: 4, premium: 2000 }],
          },
        };

        const result = getProgressReport(state);

        expect(Object.keys(result)).toEqual(['Fire']);
      });

      it('should return 0 if items data is not present', () => {
        state.entities.deal.deals = [];

        const result = getProgressReport(state);

        expect(result).toBe(0);
      });
    });
  });
});
