import React from 'react';
import { ItemName } from './ItemName';
import { ItemPrice } from './ItemPrice';
import { Circle } from './Circle';

import { getItemImage } from '../services/api';

interface MenuItemProps {
  _id: string,
  name: string,
  price: number,
  onSelect: (_id: string) => void;
}

export function MenuItem({
  onSelect,
  name,
  price,
  _id,
}: MenuItemProps) {
  const handleItemSelect = React.useCallback(() => {
    onSelect(_id);
  }, [onSelect, _id]);

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md m-1 p-1">
      <div className="flex justify-center">
        <img
          className="h-24 w-full object-cover md:w-24"
          src={getItemImage()}
          alt="Man looking at item at a store"
        />
      </div>
        <div className="flex p-2">
          <div className="w-full">
            <ItemName name={name} />
            <ItemPrice price={price} />
          </div>
            <Circle onClick={handleItemSelect} type="plus" />
        </div>
    </div>
  );
}
