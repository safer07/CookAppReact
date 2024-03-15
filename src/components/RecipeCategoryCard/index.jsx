export default function RecipeCategoryCard({ category, onClick }) {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white shadow"
      onClick={onClick}
    >
      <img
        className="aspect-[3/2] w-full"
        src={category.img}
        alt={category.name}
      />
      <h3 className="label-small mb-0.75 mt-0.5 text-center">
        {category.name}
      </h3>
    </div>
  );
}
