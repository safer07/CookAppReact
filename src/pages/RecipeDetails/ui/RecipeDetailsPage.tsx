import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFullRecipe from "../store/store";
import RecipeInfo from "./RecipeInfo";
import FeaturedRecipes from "./FeaturedRecipes";
import RecipeTabs from "./RecipeTabs";
import TopAppBar from "../../../widgets/TopAppBar";
import Button from "../../../shared/ui/Button";

export default function RecipeDetailsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipe, status, fetchFullRecipe } = useFullRecipe();

  useEffect(() => {
    if (!id || recipe?._id === id) return;
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
                navigate(`/recipes/${id}/cooking-mode`, { replace: true })
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
