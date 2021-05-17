import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { CartItem, ShopState } from '../types';

import { ItemPrice } from './ItemPrice';

const selectTotalPrice = createSelector(
  (state: ShopState) => state.cart,
  (cart) => cart.reduce(
    (acc, item: CartItem) => acc + (item.price * item.count), 0,
  ),
);

export const TotalPrice = () => {
  const totalPrice = useSelector(selectTotalPrice);
  return (
    <div className="flex">
      <span>Total price:</span>
      <ItemPrice price={totalPrice} />
    </div>
  );
};
