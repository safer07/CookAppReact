import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { categories } from "../../../entities/recipeCategory/const/categories";
import { selectFullRecipe } from "../../../store/slices/fullRecipeSlice";
import {
  addRecipe,
  removeRecipe,
  selectLikedRecipes,
} from "../../../store/slices/likedRecipesSlice";
import ButtonIcon from "../../../shared/ui/ButtonIcon";
import LikeButton from "../../../shared/ui/LikeButton";
import Tag from "../../../shared/ui/Tag";
import getRecipeDifficultyTextAndSurface from "../../../shared/utils/getRecipeDifficultyTextAndSurface";

export default function RecipeInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe } = useSelector(selectFullRecipe);
  const likedRecipes = useSelector(selectLikedRecipes);
  const [difficultyText, tagDifficultySurface] =
    getRecipeDifficultyTextAndSurface(recipe?.difficulty);

  const recipeCategory = categories.find(
    (category) => category.id === recipe?.category,
  );

  // TODO: вынести это отдельно
  // function handleLike(id: string) {
  //   if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
  //   else dispatch(addRecipe(id));
  // }

  const handleLike = useCallback(
    (id: string) => {
      if (likedRecipes.includes(id)) dispatch(removeRecipe(id));
      else dispatch(addRecipe(id));
    },
    [recipe],
  );

  // Этот вариант не должен появляться. Создан только для TypeScript. При ошибке загрузки recipe, этот компонент вообще не должен рендериться
  if (!recipe) return <>'Не удалось загрузить рецепт'</>;

  return (
    <>
      <div className="layout-fullwidth relative">
        <img
          className="aspect-[9/7] w-full object-cover"
          src={recipe?.img}
          alt={recipe?.name}
        />
        <ButtonIcon
          className="absolute left-2 top-2"
          icon="arrow_left"
          onClick={() => navigate(-1)}
          size="small"
        />
        <LikeButton
          className="absolute right-2 top-2"
          active={likedRecipes.includes(recipe.id)}
          itemId={recipe.id}
          handleLike={handleLike}
        />
      </div>
      <div className="grid gap-1 pb-2 pt-1">
        <div>
          <h1 className="headline-large">{recipe?.name}</h1>
          <p className="pt-0.5 text-secondary-color">
            {recipeCategory?.fullName}
          </p>
        </div>
        <p className="text-secondary-color">{recipe.description}</p>
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
    </>
  );
}
