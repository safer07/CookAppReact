import { useEffect, useState } from "react";
import { fetchCategories, fetchRecipes } from "../api";
import RecipeCategoryCard from "../components/RecipeCategoryCard";
import RecipeCard from "../components/RecipeCard";

export default function RecipesPage() {
  const [loading, setLoading] = useState(false);
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const categories = await fetchCategories();
      const recipes = await fetchRecipes();

      setRecipeСategories(categories);
      setRecipes(recipes);
      setLoading(false);
    }
    preload();
  }, []);

  return (
    <div className="container">
      <div className="py-1.5">
        <h1 className="headline-large">Рецепты</h1>
      </div>
      <div className="my-2">
        <div>
          <h2 className="headline-medium">Категории</h2>
          {loading && <div>Загрузка...</div>}
          {!loading && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {recipeСategories.map((category) => (
                <RecipeCategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <h2 className="headline-medium">Горячие блюда</h2>
            <div className="text-primary">Смотреть все</div>
          </div>
          <div className="mt-2 grid gap-2">
            {loading && <div>Загрузка...</div>}
            {!loading &&
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
