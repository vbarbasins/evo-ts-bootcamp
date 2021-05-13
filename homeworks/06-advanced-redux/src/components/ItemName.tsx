interface ItemNameProps {
    name: string;
}

export function ItemName({ name }: ItemNameProps) {
  return (
    <div className="block mt-1 text-lg leading-tight font-medium text-black">
      {name}
    </div>
  );
}
