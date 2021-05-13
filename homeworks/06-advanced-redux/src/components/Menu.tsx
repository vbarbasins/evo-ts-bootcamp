import * as R from 'ramda';

import { MenuItem } from './MenuItem';

interface MenuProps {
    menuItems: {
      _id: string;
      name: string;
      price: number;
    }[];
    onItemSelect: (_id: string) => void;
}

export function Menu({ menuItems, onItemSelect }: MenuProps) {
  return R.map((p) => (
    <MenuItem
      key={p._id}
      _id={p._id}
      name={p.name}
      price={p.price}
      onSelect={onItemSelect}
    />
  ), menuItems);
}
