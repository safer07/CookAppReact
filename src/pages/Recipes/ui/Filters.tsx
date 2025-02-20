import ReactDOM from 'react-dom'

import TopAppBar from '@/widgets/TopAppBar'

import Chip from '@/shared/ui/Chip'

import { useRecipes } from '../store/recipesStore'

type FilterProps = {
  open: boolean
  setClose: () => void
  setTempSearchQuery: (value: string) => void
  recipeCategories: RecipeCategory[]
  findCategoryById: (id: string) => RecipeCategory | undefined
}

export default function Filters({
  open,
  setClose,
  setTempSearchQuery,
  recipeCategories,
  findCategoryById,
}: FilterProps): React.JSX.Element {
  const { filters, setCategories, setSearchQuery, resetFilters } = useRecipes()
  const { categories, searchQuery } = filters

  function resetHandle() {
    resetFilters()
    setTempSearchQuery('')
  }

  function toggleCategory(categoryId: string) {
    if (categories.includes(categoryId)) setCategories(categories.filter((id) => id !== categoryId))
    else setCategories([...categories, categoryId])
  }

  return ReactDOM.createPortal(
    <div
      className="surface-default fixed inset-0 z-30 transition-transform duration-500 ease-in-out data-[open='false']:translate-x-full"
      data-open={open}
    >
      <aside className="layout-grid">
        <TopAppBar title="Фильтры" back backOnClick={setClose} />

        <div className="mt-2">
          {/* Чипы */}
          {(categories.length > 0 || searchQuery) && (
            <div className="mb-3 flex flex-wrap gap-1">
              {searchQuery && (
                <Chip
                  text={`Поиск: ${searchQuery}`}
                  onClick={() => {
                    setSearchQuery('')
                    setTempSearchQuery('')
                  }}
                  del
                />
              )}
              {categories.map((categoryId) => (
                <Chip
                  key={categoryId}
                  text={`Категория: ${findCategoryById(categoryId)?.name}`}
                  onClick={() => toggleCategory(categoryId)}
                  del
                />
              ))}
              <Chip text="Сбросить фильтры" onClick={resetHandle} variant="active" del />
            </div>
          )}

          <div>
            <div className="headline-medium">Категория</div>
            <ul className="mt-2 flex flex-wrap gap-1">
              {recipeCategories.map((category) => (
                <li key={category.name}>
                  <Chip
                    text={category.name}
                    onClick={() => toggleCategory(category.id)}
                    variant={categories.includes(category.id) ? 'active' : 'default'}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>,
    document.getElementById('modal-portal')!,
  )
}
