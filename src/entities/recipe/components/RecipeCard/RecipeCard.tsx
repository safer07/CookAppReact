import { Link } from "react-router-dom";

import RecipeCardSkeleton from "./RecipeCardSkeleton";
import { categories } from "../../../recipeCategory/const/categories";
import LikeButton from "../../../user/components/LikeButton";
import getRecipeDifficultyTextAndSurface from "../../../../shared/utils/getRecipeDifficultyTextAndSurface";
import Tag from "../../../../shared/ui/Tag";

type RecipeCardProps = {
  recipe: IRecipeItem;
};

export default function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  const [difficultyText, tagDifficultySurface] =
    getRecipeDifficultyTextAndSurface(recipe?.difficulty);

  const recipeCategory = categories.find(
    (category) => category.id === recipe.category,
  );

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="surface-default group overflow-hidden rounded-2xl shadow transition-all duration-300 hover-hover:hover:shadow-glow hover-hover:hover:shadow-primary"
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            className="size-full object-cover transition-transform duration-300 hover-hover:group-hover:scale-105"
            src={recipe.img}
            alt={recipe.name}
          />
        </div>
        <LikeButton itemId={recipe.id} className="absolute right-1.5 top-1.5" />
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small line-clamp-2 h-[calc(var(--h3-line-height)*2)] transition-colors duration-300 hover-hover:group-hover:text-primary">
          {recipe.name}
        </h3>
        <p className="text-secondary-color">{recipeCategory?.fullName}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="size-2 fill-primary">
              <use href="/images/icons.svg#clock"></use>
            </svg>
            <div className="label-small text-secondary-color">
              {recipe.time} минут
            </div>
          </div>
          <Tag text={difficultyText} surface={tagDifficultySurface} />
        </div>
      </div>
    </Link>
  );
}

RecipeCard.Skeleton = RecipeCardSkeleton;
