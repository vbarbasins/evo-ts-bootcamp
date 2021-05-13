import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { logger } from './middlewares';
import { shopReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewareEnhancer = applyMiddleware(...[thunk, logger]);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const shop = createStore(
  shopReducer,
  undefined,
  composeEnhancers(middlewareEnhancer),
);
