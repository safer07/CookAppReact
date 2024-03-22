import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes } from "../../redux/slices/recipesSlice";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";

export default function Favourites() {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector((state) => state.recipes);
  const likedRecipes = useSelector((state) => state.likedRecipes.items);
  const [tempRecipes, setTempRecipes] = useState([]);

  // TODO пока загружаются все рецепты, затем фильтруются. Нужно создать в redux массив с likedRecipes, или подгружать их с бэкенда запросом
  useEffect(() => {
    dispatch(fetchRecipes());
    const filteredRecipes = recipes.filter((recipe) =>
      likedRecipes.includes(recipe.id),
    );
    setTempRecipes(filteredRecipes);
  }, []);

  return (
    <div className="py-2">
      <div>
        <h2 className="headline-medium">
          {status === "error"
            ? "Не удалось загрузить рецепты"
            : "Рецепты в избранном"}
        </h2>
      </div>
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
