import { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as R from 'ramda';

import './App.css';

import {
  Loading,
  Missing,
  Menu,
  Cart,
  TotalPrice,
} from './components';

import { shop } from './redux/store';
import { addToCart, removeFromCart, selectItem } from './redux/actions/shop';
import { loadMenuAsync } from './redux/actions/menu';

import { Pizza, ShopState } from './types';

interface AppProps {
  state: ShopState
}

function App(props: AppProps) {
  const { menu, cart } = props.state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMenuAsync());
  }, []);

  const handleRemoveItemFromCart = useCallback((_id: string) => {
    shop.dispatch(removeFromCart(_id));
  }, [menu, cart]);

  const handleAddItemToCart = useCallback((_id: string) => {
    shop.dispatch(selectItem(_id));
    shop.dispatch(addToCart(_id));
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

  const totalPrice = cart.reduce(
    (acc, item: Pizza) => acc + item.price, 0,
  );

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
const mapStateToProps = (state: ShopState) => ({ state });

const AppConnected = connect(mapStateToProps, {})(App);

export default AppConnected;
