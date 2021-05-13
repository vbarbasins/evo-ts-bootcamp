interface ItemDescriptionProps {
    desc: string;
}

export function ItemDescription({ desc }: ItemDescriptionProps) {
  return (
    <p className="mt-2 text-gray-500">{desc}</p>
  );
}
