import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import Stats from '../Stats';

const store = configureAppStore();

describe('Stats', () => {
  it('should match the snapshot of Stats component', () => {
    const today = 300;
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Stats today={today} />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
