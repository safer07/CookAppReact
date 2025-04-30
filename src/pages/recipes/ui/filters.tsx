import { useEffect } from 'react'
import ReactDOM from 'react-dom'

import TopAppBar from '@/widgets/top-app-bar'

import { RECIPE_DIFFICULTIES, findCategoryById, useCategories } from '@/entities/recipe'

import Chip from '@/shared/ui/chip'
import Input from '@/shared/ui/input'

import { getFiltersCount } from '../lib/get-filters-count'
import { useCatalog } from '../store/catalog-store'

type FilterProps = {
  open: boolean
  setClose: () => void
  inputSearchQuery: string
  setInputSearchQuery: (value: string) => void
}

export default function Filters({
  open,
  setClose,
  inputSearchQuery,
  setInputSearchQuery,
}: FilterProps): React.JSX.Element {
  const { categories } = useCategories()
  const { filters, setCategories, setSearchQuery, setDifficulties, resetFilters } = useCatalog()
  const { categories: filteredCategories, searchQuery, difficulties } = filters
  const filtersCount = getFiltersCount(filters)

  function resetHandle() {
    resetFilters()
    setInputSearchQuery('')
  }

  function toggleValue(value: number, array: number[], set: (value: number[]) => void) {
    if (array.includes(value)) set(array.filter(v => v !== value))
    else set([...array, value])
  }

  useEffect(() => {
    if (!categories.length) return
    if (filteredCategories.length === categories.length) setCategories([])
  }, [filteredCategories, categories, setCategories])

  useEffect(() => {
    if (!RECIPE_DIFFICULTIES.length) return
    if (difficulties.length === RECIPE_DIFFICULTIES.length) setDifficulties([])
  }, [difficulties, setDifficulties])

  return ReactDOM.createPortal(
    <div
      className="surface-default fixed inset-0 z-30 transition-transform duration-500 ease-in-out data-[open='false']:translate-x-full"
      data-open={open}
    >
      <aside className="layout-grid">
        <TopAppBar title="Фильтры" back backOnClick={setClose} />

        <div className="mt-2">
          {/* Чипы */}
          {filtersCount > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {searchQuery && (
                <Chip
                  text={`Поиск: ${searchQuery}`}
                  onClick={() => {
                    setSearchQuery('')
                    setInputSearchQuery('')
                  }}
                  del
                />
              )}
              {filteredCategories.map(categoryId => (
                <Chip
                  key={categoryId}
                  text={`Категория: ${findCategoryById(categoryId, categories)?.name}`}
                  onClick={() => toggleValue(categoryId, filteredCategories, setCategories)}
                  del
                />
              ))}
              {difficulties.map(value => (
                <Chip
                  key={value}
                  text={`Сложность: ${RECIPE_DIFFICULTIES.find(difficulty => difficulty.value === value)?.text}`}
                  onClick={() => toggleValue(value, difficulties, setDifficulties)}
                  del
                />
              ))}
              <Chip text="Сбросить фильтры" onClick={resetHandle} variant="active" del />
            </div>
          )}

          <div>
            <form className="grow">
              <Input
                type="search"
                value={inputSearchQuery}
                placeholder="Поиск..."
                iconLeft="search"
                onChange={setInputSearchQuery}
                clearButton
                label="Поиск по названию"
              />
            </form>

            <div className="headline-medium mt-3">Категория</div>
            <ul className="mt-1 flex flex-wrap gap-1">
              {categories.map(category => (
                <li key={category.name}>
                  <Chip
                    text={category.name}
                    onClick={() => toggleValue(category.id, filteredCategories, setCategories)}
                    variant={filteredCategories.includes(category.id) ? 'active' : 'default'}
                  />
                </li>
              ))}
            </ul>

            <div className="headline-medium mt-3">Сложность</div>
            <ul className="mt-1 flex flex-wrap gap-1">
              {RECIPE_DIFFICULTIES.map(difficulty => (
                <li key={difficulty.value}>
                  <Chip
                    text={difficulty.text}
                    onClick={() => toggleValue(difficulty.value, difficulties, setDifficulties)}
                    variant={difficulties.includes(difficulty.value) ? 'active' : 'default'}
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
