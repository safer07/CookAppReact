export default function RecipeCategoryCardSkeleton() {
  return (
    <div className="surface-default overflow-hidden rounded-2xl shadow-sm">
      <div className="skeleton aspect-3/2" />
      <div className="mt-0.5 mb-0.75 flex h-2.5 items-center justify-center">
        <div className="skeleton h-1.5 w-2/3 rounded-full"></div>
      </div>
    </div>
  )
}
