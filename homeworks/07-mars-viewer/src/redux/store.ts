import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewareEnhancer = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  appReducer,
  composeEnhancers(middlewareEnhancer),
);
