import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as R from 'ramda';

import './App.css';

import {
  Loading,
  Missing,
  Menu,
  Cart,
  TotalPrice,
} from './components';

import { addToCart, removeFromCart, selectItem } from './redux/actions/shop';
import { loadMenuAsync } from './redux/actions/menu';

import { ShopState } from './types';

function App() {
  const menu = useSelector((state: ShopState) => state.menu);
  const cart = useSelector((state: ShopState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMenuAsync());
  }, []);

  const handleRemoveItemFromCart = useCallback((_id: string) => {
    dispatch(removeFromCart(_id));
  }, []);

  const handleAddItemToCart = useCallback((_id: string) => {
    dispatch(selectItem(_id));
    dispatch(addToCart(_id));
  }, []);

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
          <TotalPrice/>
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
