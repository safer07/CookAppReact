import { useEffect, useState } from "react";
import { fetchCategories, fetchRecipes } from "../../api";
import RecipeCategoryCard from "../../components/RecipeCategoryCard";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";
import RecipeCategoryCardSkeleton from "../../components/RecipeCategoryCard/RecipeCategoryCardSkeleton";

export default function Catalog() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  function findCategoryById(id) {
    return recipeСategories.find((category) => category.id === id);
  }

  useEffect(() => {
    async function preload() {
      setIsLoading(true);
      const categories = await fetchCategories();
      const recipes = await fetchRecipes();

      setRecipeСategories(categories);
      setRecipes(recipes);
      setIsLoading(false);
    }
    preload();
  }, []);

  return (
    <div className="py-2">
      {activeCategory === null && (
        <>
          <div>
            <h2 className="headline-medium">Категории</h2>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {isLoading
                ? [...new Array(9)].map((_, i) => (
                    <RecipeCategoryCardSkeleton key={i} />
                  ))
                : recipeСategories.map((category) => (
                    <RecipeCategoryCard
                      key={category.id}
                      category={category}
                      onClick={() =>
                        setActiveCategory(findCategoryById(category.id))
                      }
                    />
                  ))}
            </div>
          </div>
          {recipeСategories.map((category) => (
            <div className="mt-3" key={category.id}>
              <div className="flex items-baseline justify-between">
                <h2 className="headline-medium">{category.fullName}</h2>
                <button
                  className="text-primary"
                  onClick={() => setActiveCategory(category)}
                >
                  Смотреть все
                </button>
              </div>
              <div className="mt-2 grid gap-2">
                {isLoading
                  ? [...new Array(4)].map((_, i) => (
                      <RecipeCardSkeleton key={i} />
                    ))
                  : recipes
                      .filter((recipe) => recipe.category === category.id)
                      .map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                      ))}
              </div>
            </div>
          ))}
        </>
      )}

      {recipeСategories.map(
        (category) =>
          activeCategory?.id === category.id && (
            <div key={category.id}>
              <div className="flex items-baseline justify-between">
                <h2 className="headline-medium">{activeCategory.fullName}</h2>
              </div>
              <div className="mt-2 grid gap-2">
                {isLoading && <div>Загрузка...</div>}
                {!isLoading &&
                  recipes
                    .filter((recipe) => recipe.category === activeCategory.id)
                    .map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
}
