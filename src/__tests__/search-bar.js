import React from 'react';
import SearchBar from '../container/SearchBar/search-bar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

import { render } from 'react-testing-library';

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

test('it displays the searchbar', () => {
  const { getByPlaceholderText } = renderWithRedux(<SearchBar />);
  const find = getByPlaceholderText(/Check the weather/);
  expect(find).toBeTruthy();
});
