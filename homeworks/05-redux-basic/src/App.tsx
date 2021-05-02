import React from 'react';
import { createStore, compose } from 'redux';

import {
  debit,
  credit,
  substractPercentage,
  updateBalance,
} from './redux/actions';
import { balanceReducer } from './redux/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const balance = createStore(balanceReducer, undefined, composeEnhancers());

// for checking list of actions in redux dev tool
balance.dispatch(updateBalance(1000.0));
balance.dispatch(credit(200.0));
balance.dispatch(debit(50.0));
balance.dispatch(substractPercentage(14.0));

class App extends React.Component<{}, {}> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="App">
        Open redux dev tools and check log monitor
      </div>
    );
  }
}

export default App;
