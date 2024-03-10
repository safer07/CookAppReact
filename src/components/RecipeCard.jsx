import Tag from "../ui/Tag";

export default function RecipeCard({ recipe }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="relative">
        <img className="aspect-video" src={recipe.img} alt={recipe.name} />
        <div className="absolute right-1.5 top-1.5 grid size-5 place-content-center rounded-full bg-white">
          <svg className="size-3">
            <use href="./images/icons.svg#example"></use>
          </svg>
        </div>
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small line-clamp-2 h-[calc(var(--h3-line-height)*2)]">
          {recipe.name}
        </h3>
        <p className="text-secondary-color">Горячие блюда</p>
        <div className="flex items-center justify-between">
          <span className="label-small text-secondary-color">
            {recipe.time} минут
          </span>
          {/* {if (recipe.difficulty === 1) */}
          <Tag text="Легко" />
        </div>
      </div>
    </div>
  );
}
