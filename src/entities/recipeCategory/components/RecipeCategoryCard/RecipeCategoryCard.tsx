type RecipeCategoryCardProps = {
  category: { name: string; img: string };
  onClick: () => void;
};

export default function RecipeCategoryCard({
  category,
  onClick,
}: RecipeCategoryCardProps) {
  return (
    <button
      className="surface-default group overflow-hidden rounded-2xl shadow transition-all duration-300 hover-hover:hover:shadow-glow hover-hover:hover:shadow-primary-active"
      onClick={onClick}
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          className="w-full object-cover transition-transform duration-300 hover-hover:group-hover:scale-110"
          src={category.img}
          alt={category.name}
        />
      </div>
      <h3 className="label-small mb-0.75 mt-0.5 text-center transition-colors duration-300 hover-hover:group-hover:text-primary">
        {category.name}
      </h3>
    </button>
  );
}
