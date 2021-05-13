import { ItemPrice } from './ItemPrice';

interface TotalPriceProps {
    price: number;
}

export function TotalPrice({ price }: TotalPriceProps) {
  return (
    <div className="flex">
      <span>Total price:</span>
      <ItemPrice price={price} />
    </div>
  );
}
