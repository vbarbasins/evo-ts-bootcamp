import React from 'react';
import ReactDOM from 'react-dom';
import { ClientContextProvider } from 'react-fetching-library';
import { Provider } from 'react-redux';

import { client } from './api/client';
import { store } from './redux/store';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ClientContextProvider client={client}>
      <Provider store={store}>
          <App />
      </Provider>
    </ClientContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
