import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../../api";
import debounce from "../../utils/debounce";
import RecipeCard from "../../components/RecipeCard";
import RecipeCardSkeleton from "../../components/RecipeCard/RecipeCardSkeleton";
import Input from "../../ui/Input";
import {
  setCategoryId,
  // setSearchQuery,
  resetFilters,
} from "../../redux/slices/filterRecipesSlice";
import { fetchRecipes } from "../../redux/slices/recipesSlice";
import Tag from "../../ui/Tag";
import Categories from "./Categories";

export default function Catalog() {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector((state) => state.recipes);
  const { categoryId } = useSelector((state) => state.filterRecipes);
  // searchQuery
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const skeletonRecipes = [...new Array(4)].map((_, i) => (
    <RecipeCardSkeleton key={i} />
  ));

  const updateSearchQuery = useCallback(
    debounce((value) => setSearchQuery(value), 1000),
    [],
  );

  function onChangeSearchInput(value) {
    updateSearchQuery(value);
  }

  function findCategoryById(id) {
    return recipeСategories.find((category) => category.id === id);
  }

  useEffect(() => {
    // TODO каждый раз загружаются категории, сохранить в redux
    async function loadCategories() {
      const categories = await fetchCategories();
      setRecipeСategories(categories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    dispatch(fetchRecipes({ categoryId, searchQuery }));
  }, [categoryId, searchQuery]);

  return (
    <>
      <div className="pb-1 pt-2">
        <Input
          placeholder="Поиск..."
          iconLeft="search"
          onChange={onChangeSearchInput}
          onClear={setSearchQuery}
        />
      </div>
      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {categoryId === null && !searchQuery && (
          <>
            <Categories categories={recipeСategories} />

            {status === "error" ? (
              <h2 className="headline-medium mt-3">
                Не удалось загрузить рецепты
              </h2>
            ) : (
              recipeСategories.map((category) => (
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
                    {status === "loading"
                      ? skeletonRecipes
                      : recipes
                          .filter((recipe) => recipe.category === category.id)
                          .map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                          ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Показ результатов поиска или выбранной категории */}
        {(categoryId !== null || searchQuery) && (
          <>
            <div className="mb-2">
              <Tag
                text="Сбросить фильтры"
                onClick={() => dispatch(resetFilters())}
              />
            </div>
            <h2 className="headline-medium">
              {status === "error" && "Не удалось загрузить рецепты"}
              {searchQuery
                ? "Найдены рецепты:"
                : findCategoryById(categoryId)?.fullName}
            </h2>
            {status !== "error" && (
              <div className="mt-2 grid gap-2">
                {status === "loading"
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
            )}
          </>
        )}
      </div>
    </>
  );
}
