import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import AppBar from '../AppBar';

const store = configureAppStore();

describe('AppBar', () => {
  test('should match the snapshot of AppBar', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <AppBar title="appbar" />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
