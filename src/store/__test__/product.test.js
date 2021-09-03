import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getProducts, loadProducts } from '../slicers/product';

describe('productSlice', () => {
  describe('loading produts', () => {
    let fakeAxios;
    let store;

    beforeEach(() => {
      fakeAxios = new MockAdapter(axios);
      store = configureAppStore();
    });

    const productSlice = () => store.getState().product;

    const products = {
      products: [
        {
          id: 1,
          product_name: 'p1',
        },
        {
          id: 1,
          product_name: 'p1',
        },
      ],
    };

    describe('loadProduct', () => {
      it('should return an array of all the products', async () => {
        fakeAxios.onGet('/products').reply(200, products);

        await store.dispatch(loadProducts());

        expect(productSlice().products).toHaveLength(2);
      });

      it('should NOT return any product if network found', async () => {
        fakeAxios.onGet('/products').reply(500);

        await store.dispatch(loadProducts());

        expect(productSlice().products).toHaveLength(0);
      });
    });

    describe('loading Indicator', () => {
      it('should return true while fetching products', () => {
        fakeAxios.onGet('/products').reply(() => {
          expect(productSlice().loading).toBe(true);
          return [200, products];
        });
        store.dispatch(loadProducts());
      });

      it('should be false after fetching products successfully', async () => {
        fakeAxios.onGet('/products').reply(200, products);

        await store.dispatch(loadProducts());

        expect(productSlice().loading).toBe(false);
      });

      it('should be false if server error detected', async () => {
        fakeAxios.onGet('/products').reply(500);

        await store.dispatch(loadProducts());

        expect(productSlice().loading).toBe(false);
      });
    });
  });

  describe('selector', () => {
    const createState = () => ({
      product: {
        products: [],
        loading: false,
      },
    });

    let state;

    beforeEach(() => {
      state = createState();
    });

    describe('getProducts', () => {
      it('should return all the products available in store ', () => {
        state.product.products = [{ id: 1, product_name: 'p1' }, { id: 2, product_name: 'p2' }];

        const result = getProducts(state);

        expect(result).toHaveLength(2);
      });
    });
  });
});
