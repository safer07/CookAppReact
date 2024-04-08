import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchCategories } from "../../app/api";
import { useAppDispatch } from "../../redux/store";
import {
  setCategoryId,
  // setSearchQuery,
  resetFilters,
  selectFilterRecipes,
} from "../../redux/slices/filterRecipesSlice";
import { fetchRecipes, selectRecipes } from "../../redux/slices/recipesSlice";
import debounce from "../../utils/debounce";
import Categories from "./Categories";
import RecipesList from "../../components/RecipesList";
import Input from "../../ui/Input";
import Tag from "../../ui/Tag";

export default function Catalog() {
  const dispatch = useAppDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const { categoryId } = useSelector(selectFilterRecipes);
  // searchQuery
  const [recipeСategories, setRecipeСategories] = useState<
    IRecipeCategoryItem[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery: (value: string) => void = useCallback(
    debounce((value: string) => setSearchQuery(value), 1000),
    [],
  );

  function onChangeSearchInput(value: string) {
    updateSearchQuery(value);
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
              <Tag
                text="Сбросить фильтры"
                onClick={() => dispatch(resetFilters())}
              />
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
