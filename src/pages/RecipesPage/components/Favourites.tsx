import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../../store/store";
import {
  fetchRecipes,
  selectRecipes,
} from "../../../store/slices/recipesSlice";
import { selectFavouriteRecipes } from "../../../store/slices/favouriveRecipesSlice";
import RecipesList from "../../../widgets/RecipesList";

export default function Favourites() {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const favouriteRecipes = useSelector(selectFavouriteRecipes);
  const [tempRecipes, setTempRecipes] = useState<IRecipeItem[]>([]);

  // TODO пока загружаются все рецепты, затем фильтруются. Нужно создать в redux массив с favouriteRecipes, или подгружать их с бэкенда запросом
  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) =>
      favouriteRecipes.includes(recipe.id),
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
