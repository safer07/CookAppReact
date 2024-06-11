import { useEffect, useState } from "react";

import { fetchCategories } from "../../../app/api";
import useRecipes from "../store/store";
import Filters from "./Filters";
import Categories from "./Categories";
import RecipesList from "../../../widgets/RecipesList";
import useDebounce from "../../../shared/hooks/debounce";
import Input from "../../../shared/ui/Input";
import ButtonIcon from "../../../shared/ui/ButtonIcon";

export default function Catalog(): JSX.Element {
  const recipes = useRecipes((state) => state.items);
  const status = useRecipes((state) => state.status);
  const filters = useRecipes((state) => state.filters);
  const { categoryId, searchQuery } = filters;
  const fetchRecipes = useRecipes((state) => state.fetchRecipes);
  const setCategoryId = useRecipes((state) => state.setCategoryId);
  const setSearchQuery = useRecipes((state) => state.setSearchQuery);
  const [filtersIsOpen, setFiltersIsOpen] = useState<boolean>(false);
  const filterCount = Object.values(filters).filter((value) => value).length;
  const [recipeСategories, setRecipeСategories] = useState<
    IRecipeCategoryItem[]
  >([]);
  const [tempSearchQuery, setTempSearchQuery] = useState<string>("");
  const debouncedSearchQuery: string =
    tempSearchQuery === ""
      ? useDebounce(tempSearchQuery, 0)
      : useDebounce(tempSearchQuery, 1000);

  function findCategoryById(id: string) {
    return recipeСategories.find((category) => category.id === id);
  }

  useEffect(() => {
    // TODO каждый раз загружаются категории, сохранить в store
    async function loadCategories() {
      const categories: IRecipeCategoryItem[] = await fetchCategories();
      setRecipeСategories(categories);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    fetchRecipes({ categoryId, searchQuery });
  }, [categoryId, searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <>
      <div className="flex gap-2 pb-1 pt-2">
        <form className="grow">
          <Input
            type="search"
            value={tempSearchQuery}
            placeholder="Поиск..."
            iconLeft="search"
            onChange={setTempSearchQuery}
            clearButton
          />
        </form>
        <ButtonIcon
          icon="settings"
          onClick={() => setFiltersIsOpen(true)}
          variant="tertiary"
          square
          badge={filterCount}
        />
      </div>

      <Filters
        open={filtersIsOpen}
        setClose={() => setFiltersIsOpen(false)}
        setTempSearchQuery={setTempSearchQuery}
        recipeСategories={recipeСategories}
        findCategoryById={findCategoryById}
      />

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
                      onClick: () => setCategoryId(category.id),
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
