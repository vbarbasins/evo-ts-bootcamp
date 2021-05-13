import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import AppConnected from './App';
import { shop } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={shop}>
      <AppConnected />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
