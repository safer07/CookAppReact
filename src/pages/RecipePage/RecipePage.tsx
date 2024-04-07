import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import {
  fetchFullRecipe,
  selectFullRecipe,
} from "../../redux/slices/fullRecipeSlice";
import RecipeInfo from "./RecipeInfo";
import RecipeInfoSkeleton from "./RecipeInfoSkeleton";
import CookingMode from "./CookingMode";
import FeaturedRecipes from "./FeaturedRecipes";
import Button from "../../ui/Button";
import RecipeTabs from "./RecipeTabs";

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { recipe, status } = useSelector(selectFullRecipe);
  const [cookingMode, setCookingMode] = useState(false);

  useEffect(() => {
    if (!id) return;
    setCookingMode(false);
    dispatch(fetchFullRecipe(id));
  }, [id]);

  if (cookingMode && recipe) {
    return <CookingMode recipe={recipe} setCookingMode={setCookingMode} />;
  }

  return (
    <>
      {status === "loading" && <RecipeInfoSkeleton />}
      {status === "error" && (
        <h1 className="headline-large">Не удалось загрузить рецепт</h1>
      )}
      {status === "success" && recipe && (
        <>
          <RecipeInfo />
          <RecipeTabs recipe={recipe} />

          <div className="py-2">
            <Button
              text="Начать готовить"
              onClick={() => setCookingMode(true)}
              type="primary"
              block
            />
          </div>

          <FeaturedRecipes excludeId={recipe.id} />
        </>
      )}
    </>
  );
}
