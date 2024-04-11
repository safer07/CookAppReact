import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { categories } from "../../../recipeCategory/const/categories";
import {
  addRecipe,
  removeRecipe,
  selectLikedRecipes,
} from "../../../../store/slices/likedRecipesSlice";
import getRecipeDifficultyTextAndSurface from "../../../../shared/utils/getRecipeDifficultyTextAndSurface";
import LikeButton from "../../../../shared/ui/LikeButton";
import Tag from "../../../../shared/ui/Tag";

type RecipeCardProps = {
  recipe: IRecipeItem;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const dispatch = useDispatch();
  const likedRecipes = useSelector(selectLikedRecipes);
  const [difficultyText, tagDifficultySurface] =
    getRecipeDifficultyTextAndSurface(recipe?.difficulty);

  const recipeCategory = categories.find(
    (category) => category.id === recipe.category,
  );

  function handleLike(id: string) {
    if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
    else dispatch(addRecipe(id));
  }

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="surface-default overflow-hidden rounded-2xl shadow"
    >
      <div className="relative">
        <img
          className="aspect-video w-full object-cover"
          src={recipe.img}
          alt={recipe.name}
        />
        <LikeButton
          className="absolute right-1.5 top-1.5"
          active={likedRecipes.includes(recipe.id)}
          itemId={recipe.id}
          handleLike={handleLike}
        />
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small line-clamp-2 h-[calc(var(--h3-line-height)*2)]">
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
