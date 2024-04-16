import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import {
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
              type={ButtonType.PRIMARY}
              block
            />
          </div>

          <FeaturedRecipes excludeId={id} />
        </>
      )}
    </>
  );
}
