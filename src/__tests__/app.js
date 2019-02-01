import React from 'react';
import App from '../components/app';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from '../reducers';

import { render, getByText } from 'react-testing-library';

jest.mock('../../node_modules/material-icons-react', () => {
  MaterialIcon: 'MaterialIcon';
});

const store = createStore(reducer);

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

test('it should load the app when there is no data', () => {
  const { getByText } = renderWithRedux(<App />, { store });
  const find = getByText(/No cities/);
});
