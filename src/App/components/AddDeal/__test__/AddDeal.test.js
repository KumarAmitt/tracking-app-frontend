import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AddDeal from '../AddDeal';
import configureAppStore from '../../../../store/configureStore';

const store = configureAppStore();

describe('AddDeal', () => {
  test('should match the snapshot of AddDeal component', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <AddDeal />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
