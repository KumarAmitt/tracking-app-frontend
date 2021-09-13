import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import Profile from '../Profile';

const store = configureAppStore();

describe('Profile', () => {
  it('should match the snapshot of Profile component', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
