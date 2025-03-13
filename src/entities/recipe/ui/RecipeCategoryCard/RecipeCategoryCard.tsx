import RecipeCategoryCardSkeleton from './RecipeCategoryCardSkeleton'

type RecipeCategoryCardProps = {
  category: { name: string; img: string }
  onClick: () => void
}

export default function RecipeCategoryCard({ category, onClick }: RecipeCategoryCardProps) {
  return (
    <button
      className="surface-default group hover:shadow-glow hover:shadow-primary-active overflow-hidden rounded-2xl shadow-sm transition-all duration-300"
      onClick={onClick}
    >
      <div className="aspect-3/2 overflow-hidden">
        <img
          className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={category.img}
          alt={category.name}
        />
      </div>
      <h3 className="label-small group-hover:text-primary mt-0.5 mb-0.75 text-center transition-colors duration-300">
        {category.name}
      </h3>
    </button>
  )
}

RecipeCategoryCard.Skeleton = RecipeCategoryCardSkeleton
