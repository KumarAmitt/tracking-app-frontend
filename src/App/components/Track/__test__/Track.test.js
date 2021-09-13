import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import Track from '../Track';

const store = configureAppStore();

describe('Track', () => {
  it('should match the snapshot of Track component', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Track />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
