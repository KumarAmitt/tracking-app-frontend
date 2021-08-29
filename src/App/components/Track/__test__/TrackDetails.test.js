import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import TrackDetails from '../TrackDetails';

const store = configureAppStore();

describe('TrackDetails', () => {
  it('should match the snapshot of TrackDetails component', () => {
    const info = [{ id: 1, product_id: 1, premium: 2000 }];
    const date = '2021-08-29';
    const location = { info, date };
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <TrackDetails location={location} />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
