import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import {
  FullRecipeStatus,
  fetchFullRecipe,
  selectFullRecipe,
} from "../../redux/slices/fullRecipeSlice";
import RecipeInfo from "./RecipeInfo";
import RecipeInfoSkeleton from "./RecipeInfoSkeleton";
import FeaturedRecipes from "./FeaturedRecipes";
import Button, { ButtonType } from "../../components/ui/Button";
import RecipeTabs from "./RecipeTabs";

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recipe, status } = useSelector(selectFullRecipe);

  useEffect(() => {
    if (!id || recipe?.id === id) return;
    dispatch(fetchFullRecipe(id));
  }, [id]);

  return (
    <>
      {status === FullRecipeStatus.LOADING && <RecipeInfoSkeleton />}
      {status === FullRecipeStatus.ERROR && (
        <h1 className="headline-large">Не удалось загрузить рецепт</h1>
      )}
      {status === FullRecipeStatus.SUCCESS && recipe && (
        <>
          <RecipeInfo />
          <RecipeTabs recipe={recipe} />

          <div className="py-2">
            <Button
              text="Начать готовить"
              onClick={() => navigate(`/recipe/${id}/cooking-mode`)}
              type={ButtonType.PRIMARY}
              block
            />
          </div>

          <FeaturedRecipes excludeId={recipe.id} />
        </>
      )}
    </>
  );
}
