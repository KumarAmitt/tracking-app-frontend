import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { createDeal } from '../slicers/deal';

describe('dealSlice', () => {
  describe('Creating and Loading deals', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const productSlice = () => store.getState().entities.deal;

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
    describe('creating deals', () => {
      it('should create a new deal successfully', async () => {
        fakeAxios.onPost(url).reply(200, dealSuccess);

        expect(productSlice().newDeal).toMatchObject([]);
        await store.dispatch(createDeal(newDeal));
        expect(productSlice().newDeal).toMatchObject({ deal: { product_id: 1, premium: 5000, application_id: 'APL001' } });
      });

      it('should NOT create deal of error occurred', async () => {
        fakeAxios.onPost(url).reply(500);

        await store.dispatch(createDeal(newDeal));

        expect(productSlice().newDeal).toMatchObject([]);
      });
    });
  });
});
