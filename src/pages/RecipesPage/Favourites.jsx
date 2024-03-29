import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes, selectRecipes } from "../../redux/slices/recipesSlice";
import { selectLikedRecipes } from "../../redux/slices/likedRecipesSlice";
import RecipesList from "./RecipesList";

export default function Favourites() {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const likedRecipes = useSelector(selectLikedRecipes);
  const [tempRecipes, setTempRecipes] = useState([]);

  // TODO пока загружаются все рецепты, затем фильтруются. Нужно создать в redux массив с likedRecipes, или подгружать их с бэкенда запросом
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) =>
      likedRecipes.includes(recipe.id),
    );
    setTempRecipes(filteredRecipes);
  }, [recipes]);

  return (
    <div className="py-2">
      <RecipesList
        title="Рецепты в избранном"
        recipes={tempRecipes}
        status={status}
      />
    </div>
  );
}
