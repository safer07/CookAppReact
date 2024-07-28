import ReactDOM from "react-dom";

import useRecipes from "../store/store";
import TopAppBar from "../../../widgets/TopAppBar";
import Chip from "../../../shared/ui/Chip";

type FilterProps = {
  open: boolean;
  setClose: () => void;
  setTempSearchQuery: (value: string) => void;
  recipeCategories: IRecipeCategoryItem[];
  findCategoryById: (id: string) => IRecipeCategoryItem | undefined;
};

export default function Filters({
  open,
  setClose,
  setTempSearchQuery,
  recipeCategories,
  findCategoryById,
}: FilterProps): JSX.Element {
  const { categoryId, searchQuery } = useRecipes((state) => state.filters);
  const setCategoryId = useRecipes((state) => state.setCategoryId);
  const setSearchQuery = useRecipes((state) => state.setSearchQuery);
  const resetFilters = useRecipes((state) => state.resetFilters);

  function resetHandle() {
    resetFilters();
    setTempSearchQuery("");
  }

  return ReactDOM.createPortal(
    <div
      className="surface-default fixed inset-0 z-30 transition-transform duration-500 ease-in-out data-[open='false']:translate-x-full"
      data-open={open}
    >
      <aside className="layout-grid">
        <TopAppBar title="Фильтры" back backOnClick={setClose} />

        {/* TODO: чипы пока не функционируют (сервер должен принимать массив категорий) */}
        <div className="mt-2">
          {/* Чипы */}
          {(categoryId || searchQuery) && (
            <div className="mb-3 flex flex-wrap gap-1">
              {searchQuery && (
                <Chip
                  text={`Поиск: ${searchQuery}`}
                  onClick={() => {
                    setSearchQuery("");
                    setTempSearchQuery("");
                  }}
                  del
                />
              )}
              {categoryId && (
                <Chip
                  text={`Категория: ${findCategoryById(categoryId!)?.name}`}
                  onClick={() => setCategoryId(null)}
                  del
                />
              )}
              <Chip
                text="Сбросить фильтры"
                onClick={resetHandle}
                variant="active"
                del
              />
            </div>
          )}

          <div>
            <div className="headline-medium">Категория</div>
            <ul className="mt-2 flex flex-wrap gap-1">
              {recipeCategories.map((category) => (
                <li key={category.name}>
                  <Chip
                    text={category.name}
                    onClick={() => setCategoryId(category.id)}
                    variant={categoryId === category.id ? "active" : "default"}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>,
    document.getElementById("modal-portal")!,
  );
}
