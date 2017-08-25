import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import saveState from "redux-save-state/localStorage";

import App from './components/app';
import reducers from './reducers';

const key = 'weather';
const createStoreWithMiddleware = applyMiddleware(
    ReduxPromise, saveState('appState')
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
