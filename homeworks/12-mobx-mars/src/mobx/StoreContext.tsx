import React from 'react';

import { Store } from './Store';

const StoreContext = React.createContext<Store>(undefined!);

export const Provider: React.FC<{ store: Store }> = ({
  children,
  store,
}) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;

export const useStore = () => {
  const store = React.useContext(StoreContext);
  return store;
};
