import React from 'react';
import ReactDOM from 'react-dom';

import { Store, Provider } from './mobx';
import { App } from './App';

const store = new Store();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
