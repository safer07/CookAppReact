import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories, fetchRecipes } from "../../api";
import debounce from "../../utils/debounce";
import RecipeCategoryCard from "../../components/RecipeCategoryCard";
import RecipeCategoryCardSkeleton from "../../components/RecipeCategoryCard/RecipeCategoryCardSkeleton";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";
import Input from "../../ui/Input";
import {
  setCategoryId,
  resetFilters,
} from "../../redux/slices/filterRecipesSlice";
import Tag from "../../ui/Tag";

export default function Catalog() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterRecipes.categoryId);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const skeletonRecipes = [...new Array(4)].map((_, i) => (
    <RecipeCardSkeleton key={i} />
  ));

  const updateSearchQuery = useCallback(
    debounce((value) => setSearchQuery(value), 1000),
    [],
  );

  function onChangeSearchInput(value) {
    setInputSearchValue(value);
    updateSearchQuery(value);
  }

  function onInputSearchClear() {
    setSearchQuery("");
  }

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
        categoryId,
        searchQuery,
      });
      if (!recipes) setRecipes([]);
      else setRecipes(recipes);
      setIsLoading(false);
    }
    loadRecipes();
  }, [recipeСategories, categoryId, searchQuery]);

  return (
    <>
      <div className="pb-1 pt-2">
        <Input
          value={inputSearchValue}
          placeholder="Поиск..."
          iconLeft="search"
          onChange={onChangeSearchInput}
          onClear={onInputSearchClear}
        />
      </div>
      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {categoryId === null && !searchQuery && (
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
                        onClick={() => dispatch(setCategoryId(category.id))}
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
                    onClick={() => dispatch(setCategoryId(category.id))}
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

        {/* Все рецепты в одной категории */}
        {categoryId && !searchQuery && (
          <>
            <div className="mb-2">
              <Tag
                text="Сбросить фильтры"
                onClick={() => dispatch(resetFilters())}
              />
            </div>
            <div className="flex justify-between">
              <h2 className="headline-medium">
                {findCategoryById(categoryId)?.fullName}
              </h2>
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
          </>
        )}

        {/* Результаты поиска */}
        {!categoryId && searchQuery && recipes.length > 0 && (
          <>
            <div className="flex justify-between">
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
          </>
        )}
        {!categoryId && searchQuery && recipes.length === 0 && (
          <div className="flex justify-between">
            <h2 className="headline-medium">Рецепты не найдены</h2>
          </div>
        )}
      </div>
    </>
  );
}
