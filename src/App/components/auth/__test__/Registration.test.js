import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import Registration from '../Registration';

const store = configureAppStore();

describe('Registration', () => {
  it('should match the snapshot of Registration component', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Registration />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
