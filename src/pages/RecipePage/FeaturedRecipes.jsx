import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes, selectRecipes } from "../../redux/slices/recipesSlice";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";
import RecipeCard from "../../components/RecipeCard";

export default function FeaturedRecipes({ excludeId }) {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const [tempRecipes, setTempRecipes] = useState([]);

  // TODO: пока загружаются все рецепты, затем фильтруются. Нужно создать в redux массив с likedRecipes, или подгружать их с бэкенда запросом
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  // TODO: костыльно фильтруем рецепты, чтобы не отображался в предложенных такой же рецепт
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => recipe.id !== excludeId);
    setTempRecipes(filteredRecipes);
  }, [recipes, excludeId]);

  return (
    <div className="py-2">
      <h2 className="headline-medium">
        {status === "error" ? "Не удалось загрузить рецепты" : "Другие рецепты"}
      </h2>
      {status !== "error" && (
        <div className="mt-2 grid gap-2">
          {status === "loading"
            ? [...new Array(5)].map((_, i) => <RecipeCardSkeleton key={i} />)
            : tempRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      )}
    </div>
  );
}
