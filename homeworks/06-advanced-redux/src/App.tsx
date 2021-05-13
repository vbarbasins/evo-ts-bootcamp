import { useCallback } from 'react';
import * as R from 'ramda';

import './App.css';

import { useApp } from './hooks';
import {
  Loading,
  Missing,
  Menu,
  Cart,
  TotalPrice,
} from './components';

function App() {
  const {
    addItemToCart,
    cart,
    menu,
    removeItemFromCart,
    totalPrice,
  } = useApp();

  const handleRemoveItemFromCart = useCallback((_id: string) => {
    removeItemFromCart(_id);
  }, [menu, cart]);

  const handleAddItemToCart = useCallback((_id: string) => {
    addItemToCart(_id);
  }, [menu, cart]);

  const shopMenu = R.cond([
    [R.isEmpty, Loading],
    [R.T, (items) => Menu({
      menuItems: items,
      onItemSelect: handleAddItemToCart,
    })],
  ]);

  const shopCart = R.cond([
    [R.isEmpty, Missing],
    [R.T, (item) => Cart({
      cartItems: item,
      onItemRemove: handleRemoveItemFromCart,
    })],
  ]);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          {shopMenu(menu)}
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPrice price={totalPrice} />
          {shopCart(cart)}
          <div className="flex flex-col">
            <button className="bg-yellow-400 rounded-xl pt-2 pb-2">
              Make Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
