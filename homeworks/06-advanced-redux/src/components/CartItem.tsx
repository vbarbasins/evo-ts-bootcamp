import { useCallback } from 'react';

import { Circle } from './Circle';
import { ItemCount } from './PizzaCount';
import { ItemDescription } from './ItemDescription';
import { ItemName } from './ItemName';
import { ItemPrice } from './ItemPrice';

import { getItemImage } from '../services/api';

interface CartItemProps {
  onRemove: (_id: string) => void;
  price: number;
  name: string;
  count: number;
  _id: string;
}

export function CartItem({
  onRemove,
  _id,
  price,
  name,
  count,
}: CartItemProps) {
  const handleItemRemove = useCallback(() => {
    onRemove(_id);
  }, [onRemove, _id]);

  return (
    <div className="w-full bg-white rounded mb-2">
      <div className="flex">
        <div className="flex-shrink-0 p-1">
          <img
            className="h-24 w-full object-cover md:w-24"
            src={getItemImage()}
            alt="item image"
          />
        </div>
        <div className="w-full p-4">
          <ItemName name={name} />
          <ItemDescription desc="description" />
          <ItemCount count={count} />
        </div>
        <div className="flex flex-col justify-around">
          <ItemPrice price={price} />
          <Circle onClick={handleItemRemove} type="minus" />
        </div>
      </div>
    </div>
  );
}
