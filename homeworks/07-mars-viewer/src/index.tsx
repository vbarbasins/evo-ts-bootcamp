import React from 'react';
import ReactDOM from 'react-dom';
import { ClientContextProvider } from 'react-fetching-library';

import { client } from './api/client';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ClientContextProvider client={client}>
      <App />
    </ClientContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
