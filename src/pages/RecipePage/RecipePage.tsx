import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import {
  FullRecipeStatus,
  fetchFullRecipe,
  selectFullRecipe,
} from "../../store/slices/fullRecipeSlice";
import RecipeInfo from "./components/RecipeInfo";
import RecipeInfoSkeleton from "./components/RecipeInfoSkeleton";
import FeaturedRecipes from "./components/FeaturedRecipes";
import RecipeTabs from "./components/RecipeTabs";
import TopAppBar from "../../widgets/TopAppBar";
import Button, { ButtonType } from "../../shared/ui/Button";

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
        <TopAppBar title="Не удалось загрузить рецепт" back />
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
