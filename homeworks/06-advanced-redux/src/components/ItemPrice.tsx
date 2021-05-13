interface ItemPriceProps {
    price: number;
}

export function ItemPrice({ price }: ItemPriceProps) {
  return (
    <p>
      <span className="text-yellow-400 mr-1">$</span>
      {price}
    </p>
  );
}
