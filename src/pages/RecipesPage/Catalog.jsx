import { useEffect, useState } from "react";

import { fetchCategories, fetchRecipes } from "../../api";
import RecipeCategoryCard from "../../components/RecipeCategoryCard";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";
import RecipeCategoryCardSkeleton from "../../components/RecipeCategoryCard/RecipeCategoryCardSkeleton";
import Input from "../../ui/Input";

export default function Catalog() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const skeletonRecipes = [...new Array(4)].map((_, i) => (
    <RecipeCardSkeleton key={i} />
  ));

  function findCategoryById(id) {
    return recipeСategories.find((category) => category.id === id);
  }

  useEffect(() => {
    async function loadCategories() {
      setIsLoading(true);
      const categories = await fetchCategories();
      setRecipeСategories(categories);
      setIsLoading(false);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!recipeСategories.length) return;
    async function loadRecipes() {
      setIsLoading(true);
      const recipes = await fetchRecipes({
        categoryId: activeCategory?.id,
        searchQuery,
      });
      setRecipes(recipes);
      setIsLoading(false);
    }
    loadRecipes();
  }, [recipeСategories, activeCategory, searchQuery]);

  return (
    <>
      <div className="pb-1 pt-2">
        <Input
          value={searchQuery}
          placeholder="Поиск..."
          iconLeft="search"
          onChange={setSearchQuery}
        />
      </div>
      <div className="py-2">
        {activeCategory === null && !searchQuery && (
          <>
            <div>
              <h2 className="headline-medium">Категории</h2>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {!recipeСategories.length
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
                    ? skeletonRecipes
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

        {activeCategory && !searchQuery && (
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="headline-medium">{activeCategory.fullName}</h2>
            </div>
            <div className="mt-2 grid gap-2">
              {isLoading
                ? skeletonRecipes
                : recipes
                    .filter((recipe) =>
                      recipe.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    )
                    .map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
            </div>
          </div>
        )}

        {!activeCategory && searchQuery && (
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="headline-medium">Найдены рецепты:</h2>
            </div>
            <div className="mt-2 grid gap-2">
              {isLoading
                ? skeletonRecipes
                : recipes
                    .filter((recipe) =>
                      recipe.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                    )
                    .map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
