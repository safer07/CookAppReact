import Tag from "../../ui/Tag";

export default function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="relative">
        <div className="skeleton aspect-video w-full" />
        <div className="absolute right-1.5 top-1.5 size-5 rounded-full bg-white" />
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <div className="h-[calc(var(--h3-line-height)*2)]">
          <div className="skeleton h-2 w-2/3 rounded-full" />
        </div>
        <div className="flex h-3 items-center">
          <div className="skeleton h-1.5 w-20 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="skeleton h-1.5 w-12 rounded-full" />
          </div>
          <div className="skeleton h-3.5 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
