import ButtonIcon from "../../ui/ButtonIcon";

export default function RecipeInfoSkeleton() {
  return (
    <>
      <div className="layout-fullwidth relative ">
        <div className="skeleton aspect-[9/7]"></div>
        <ButtonIcon
          className="absolute left-2 top-2"
          icon="/images/icons.svg#arrow_left"
          onClick={() => navigate(-1)}
        />
        <div className="absolute right-2 top-2 size-5 rounded-full bg-white" />
      </div>
      <div className="grid gap-1 pb-2 pt-1">
        <div>
          <div className="flex h-[calc(var(--h3-line-height)*1)] items-center">
            <div className="skeleton h-2 w-2/3 rounded-full" />
          </div>
        </div>
        <div className="flex h-3 items-center">
          <div className="skeleton h-1.5 w-20 rounded-full" />
        </div>
        <div>
          {[...new Array(5)].map((_, i) => (
            <div className="flex h-3 items-center" key={i}>
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="skeleton h-1.5 w-12 rounded-full" />
          </div>
          <div className="skeleton h-3.5 w-10 rounded-full" />
        </div>
      </div>
    </>
  );
}
