import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../../store/store";
import {
  fetchRecipes,
  selectRecipes,
} from "../../../store/slices/recipesSlice";
import { selectLikedRecipes } from "../../../store/slices/likedRecipesSlice";
import RecipesList from "../../../widgets/RecipesList";

export default function Favourites() {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const likedRecipes = useSelector(selectLikedRecipes);
  const [tempRecipes, setTempRecipes] = useState<IRecipeItem[]>([]);

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
