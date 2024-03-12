import { useEffect, useState } from "react";
import { useProfile } from "../../context/UserProfileContext";
import { fetchRecipes } from "../../api";
import RecipeCard from "../../components/RecipeCard";

export default function Favourites() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { likedRecipes } = useProfile();

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const fetchedRecipes = await fetchRecipes();
      const filteredRecipes = fetchedRecipes.filter((recipe) =>
        likedRecipes.includes(recipe.id),
      );
      setRecipes(filteredRecipes);
      setLoading(false);
    }
    preload();
  }, []);

  return (
    <div className="py-2">
      <div>
        <h2 className="headline-medium">Рецепты в избранном</h2>
      </div>
      <div className="mt-2 grid gap-2">
        {loading && <div>Загрузка...</div>}
        {!loading &&
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}
