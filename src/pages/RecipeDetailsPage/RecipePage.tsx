import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFullRecipe from "./store/store";
import RecipeInfo from "./components/RecipeInfo";
import FeaturedRecipes from "./components/FeaturedRecipes";
import RecipeTabs from "./components/RecipeTabs";
import TopAppBar from "../../widgets/TopAppBar";
import Button from "../../shared/ui/Button";

export default function RecipePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipe, status, fetchFullRecipe } = useFullRecipe();

  useEffect(() => {
    if (!id || recipe?.id === id) return;
    fetchFullRecipe(id);
  }, [id]);

  return (
    <>
      {status === "loading" && <RecipeInfo.Skeleton />}
      {status === "error" && (
        <>
          <TopAppBar title="Не удалось загрузить рецепт" back />
          <FeaturedRecipes excludeId={id} />
        </>
      )}
      {status === "success" && recipe && (
        <>
          <RecipeInfo recipe={recipe} />
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
