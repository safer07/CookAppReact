export default function RecipeCategoryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="skeleton aspect-[3/2]" />
      <div className="mb-0.75 mt-0.5 flex h-2.5 items-center justify-center">
        <div className="skeleton h-1.5 w-2/3 rounded-full"></div>
      </div>
    </div>
  );
}
