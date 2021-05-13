import { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';

import { getMenu } from '../services/api';

import { Pizza } from '../types';

export function useApp() {
  const [menu, setMenu] = useState<Pizza[]>([]);
  const [cart, setCart] = useState<Pizza[]>([]);

  useEffect(() => {
    getMenu()
      .then((result) => setMenu(result.items));
  }, []);

  const addItemToCart = useCallback((_id: string) => {
    const menuItem = menu.filter((item) => item._id === _id)[0];
    setCart([...cart, menuItem]);
  }, [menu, cart]);

  const removeItemFromCart = useCallback((_id: string) => {
    const idx = R.findLastIndex((x: Pizza) => x._id === _id)(cart);
    if (idx !== -1) {
      setCart(R.remove(idx, 1, cart));
    }
  }, [cart]);

  const validCart = R.compose(
    R.values,
    R.mapObjIndexed(
      (items: Pizza[]) => items.reduce(
        (acc, item) => ({
          ...item,
          price: acc.price + item.price,
          count: acc.count + 1,
        }),
        { count: 0, price: 0 },
      ),
    ),
    R.groupBy((x: Pizza) => x._id),
  )(cart);

  const totalPrice = validCart
    .reduce((acc, item: Pizza) => acc + item.price, 0);

  return {
    totalPrice,
    menu,
    cart: validCart,
    addItemToCart,
    removeItemFromCart,
  };
}
