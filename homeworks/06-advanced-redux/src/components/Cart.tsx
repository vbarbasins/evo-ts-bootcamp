import * as R from 'ramda';

import { CartItem } from './CartItem';

import { Pizza } from '../types';

interface CartProps {
    cartItems: Array<Pizza & {count: number}>,
    onItemRemove: (_id: string) => void;
}

export function Cart({ cartItems, onItemRemove }: CartProps) {
  return R.map((p) => (
    <CartItem
      _id={p._id}
      onRemove={onItemRemove}
      key={p._id}
      price={p.price}
      name={p.name}
      count={p.count}
    />
  ), cartItems);
}
