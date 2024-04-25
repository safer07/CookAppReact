import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import {
  fetchFullRecipe,
  selectFullRecipe,
} from "../../store/slices/fullRecipeSlice";
import RecipeInfo, { RecipeInfoSkeleton } from "./components/RecipeInfo";
import FeaturedRecipes from "./components/FeaturedRecipes";
import RecipeTabs from "./components/RecipeTabs";
import TopAppBar from "../../widgets/TopAppBar";
import Button from "../../shared/ui/Button";

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
      {status === "loading" && <RecipeInfoSkeleton />}
      {status === "error" && (
        <>
          <TopAppBar title="Не удалось загрузить рецепт" back />
          <FeaturedRecipes excludeId={id} />
        </>
      )}
      {status === "success" && recipe && (
        <>
          <RecipeInfo />
          <RecipeTabs recipe={recipe} />

          <div className="py-2">
            <Button
              text="Начать готовить"
              onClick={() =>
                navigate(`/recipe/${id}/cooking-mode`, { replace: true })
              }
              variant="primary"
              block
            />
          </div>

          <FeaturedRecipes excludeId={id} />
        </>
      )}
    </>
  );
}
