import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../../app/api";
import debounce from "../../utils/debounce";
import {
  setCategoryId,
  // setSearchQuery,
  resetFilters,
  selectFilterRecipes,
} from "../../redux/slices/filterRecipesSlice";
import { fetchRecipes, selectRecipes } from "../../redux/slices/recipesSlice";
import Categories from "./Categories";
import RecipesList from "../../components/RecipesList";
import Input from "../../ui/Input";
import Tag from "../../ui/Tag";

export default function Catalog() {
  const dispatch = useDispatch();
  const { items: recipes, status } = useSelector(selectRecipes);
  const { categoryId } = useSelector(selectFilterRecipes);
  // searchQuery
  const [recipeСategories, setRecipeСategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
                  : findCategoryById(categoryId)?.fullName
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
