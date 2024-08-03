import { useEffect, useState } from "react";

import useRecipes from "../store/store";
import useUser from "../../../entities/user/store/store";
import RecipesList from "../../../widgets/RecipesList";

export default function Favourites(): JSX.Element {
  const recipes = useRecipes((state) => state.items);
  const status = useRecipes((state) => state.status);
  const fetchRecipes = useRecipes((state) => state.fetchRecipes);
  const favouriteRecipes = useUser((state) => state.favouriteRecipes);
  const [tempRecipes, setTempRecipes] = useState<IRecipeItem[]>([]);

  // TODO: пока загружаются все рецепты, затем фильтруются. Нужно подгружать их с бэкенда запросом
  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) =>
      favouriteRecipes.includes(recipe._id),
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
