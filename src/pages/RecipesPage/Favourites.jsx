import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchRecipes } from "../../api";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";

export default function Favourites() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const likedRecipes = useSelector((state) => state.likedRecipes.items);

  useEffect(() => {
    async function loadRecipes() {
      setIsLoading(true);
      const fetchedRecipes = await fetchRecipes();
      const filteredRecipes = fetchedRecipes.filter((recipe) =>
        likedRecipes.includes(recipe.id),
      );
      setRecipes(filteredRecipes);
      setIsLoading(false);
    }
    loadRecipes();
  }, []);

  return (
    <div className="py-2">
      <div>
        <h2 className="headline-medium">Рецепты в избранном</h2>
      </div>
      <div className="mt-2 grid gap-2">
        {isLoading
          ? [...new Array(5)].map((_, i) => <RecipeCardSkeleton key={i} />)
          : recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </div>
    </div>
  );
}
