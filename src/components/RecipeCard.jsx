import { useProfile } from "../context/UserProfileContext";
import LikeButton from "../ui/LikeButton";
import Tag from "../ui/Tag";

export default function RecipeCard({ recipe }) {
  const { likedRecipes } = useProfile();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="relative">
        <img className="aspect-video" src={recipe.img} alt={recipe.name} />
        <div className="absolute right-1.5 top-1.5">
          <LikeButton
            active={likedRecipes.includes(recipe.id)}
            recipeId={recipe.id}
          />
        </div>
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small line-clamp-2 h-[calc(var(--h3-line-height)*2)]">
          {recipe.name}
        </h3>
        <p className="text-secondary-color">Горячие блюда</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="size-2 fill-primary">
              <use href="./images/icons.svg#clock"></use>
            </svg>
            <div className="label-small text-secondary-color">
              {recipe.time} минут
            </div>
          </div>
          {/* {if (recipe.difficulty === 1) */}
          <Tag text="Легко" />
        </div>
      </div>
    </div>
  );
}
