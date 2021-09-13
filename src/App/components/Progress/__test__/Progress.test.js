import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureAppStore from '../../../../store/configureStore';
import Progress from '../Progress';

const store = configureAppStore();

describe('Progress', () => {
  it('should match the snapshot of Progress component', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Progress />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
