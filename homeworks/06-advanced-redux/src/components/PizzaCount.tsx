interface ItemCountProps {
    count: number
}

export function ItemCount({ count }: ItemCountProps) {
  return (
    <p>
      <span className="text-yellow-400 mr-1">x</span>
      {count}
    </p>
  );
}
