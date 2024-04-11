import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchCategories } from "../../../app/api";
import { useAppDispatch } from "../../../store/store";
import {
  setCategoryId,
  setSearchQuery,
  resetFilters,
  selectFilterRecipes,
} from "../../../store/slices/filterRecipesSlice";
import {
  RecipesStatus,
  fetchRecipes,
  selectRecipes,
} from "../../../store/slices/recipesSlice";
import useDebounce from "../../../shared/hooks/debounce";
import Categories from "./Categories";
import RecipesList from "../../../widgets/RecipesList";
import Input from "../../../shared/ui/Input";
import Tag from "../../../shared/ui/Tag";

export default function Catalog() {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const { categoryId, searchQuery } = useSelector(selectFilterRecipes);
  const [recipeСategories, setRecipeСategories] = useState<
    IRecipeCategoryItem[]
  >([]);
  const [tempSearchQuery, setTempSearchQuery] = useState<string>("");
  const debouncedSearchQuery: string =
    tempSearchQuery === ""
      ? useDebounce(tempSearchQuery, 0)
      : useDebounce(tempSearchQuery, 1000);

  function resetHandle() {
    dispatch(resetFilters());
    setTempSearchQuery("");
  }

  function findCategoryById(id: string) {
    return recipeСategories.find((category) => category.id === id);
  }

  useEffect(() => {
    // TODO каждый раз загружаются категории, сохранить в redux
    async function loadCategories() {
      const categories: IRecipeCategoryItem[] = await fetchCategories();
      setRecipeСategories(categories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    dispatch(fetchRecipes({ categoryId, searchQuery }));
  }, [categoryId, searchQuery]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery]);

  return (
    <>
      <div className="pb-1 pt-2">
        <Input
          value={tempSearchQuery}
          placeholder="Поиск..."
          iconLeft="search"
          onChange={setTempSearchQuery}
        />
      </div>
      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {categoryId === null && !searchQuery && (
          <>
            <Categories categories={recipeСategories} />

            {status === RecipesStatus.ERROR ? (
              <h2 className="headline-medium mt-3">
                Не удалось загрузить рецепты
              </h2>
            ) : (
              recipeСategories.map((category) => (
                <div className="mt-3" key={category.id}>
                  <RecipesList
                    title={category.fullName}
                    recipes={recipes.filter(
                      (recipe) => recipe.category === category.id,
                    )}
                    status={status}
                    button={{
                      name: "Смотреть все",
                      onClick: () => dispatch(setCategoryId(category.id)),
                    }}
                  />
                </div>
              ))
            )}
          </>
        )}

        {/* Показ результатов поиска или выбранной категории */}
        {(categoryId !== null || searchQuery) && (
          <>
            <div className="mb-2">
              <Tag text="Сбросить фильтры" onClick={resetHandle} />
            </div>

            <RecipesList
              title={
                searchQuery
                  ? "Найдены рецепты:"
                  : findCategoryById(categoryId!)?.fullName ||
                    "Заголовок категории не найден"
              }
              recipes={recipes}
              status={status}
            />
          </>
        )}
      </div>
    </>
  );
}
