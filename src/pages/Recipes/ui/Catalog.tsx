import { useEffect, useState } from 'react'

import { fetchCategories } from '@/app/api'

import RecipesList from '@/widgets/RecipesList'

import type { RecipeCategory } from '@/entities/recipeCategory/const/categories'

import { catchHttpError, useDebounce } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

import { useRecipes } from '../store/recipesStore'
import Categories from './Categories'
import FeaturedRecipes from './FeaturedRecipes'
import Filters from './Filters'

// TODO: убрать импорт из app

export default function Catalog(): React.JSX.Element {
  const { items: recipes, status, filters, fetchRecipes, setSearchQuery } = useRecipes()
  const { categories, searchQuery } = filters
  const [filtersIsOpen, setFiltersIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<CustomError>(null)
  const filtersCount = Object.values(filters).filter(value => value.length !== 0).length
  const [recipeCategories, setRecipeCategories] = useState<RecipeCategory[]>([])
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
  const debouncedSearchQuery: string =
    tempSearchQuery === '' ? useDebounce(tempSearchQuery, 0) : useDebounce(tempSearchQuery, 1000)

  function findCategoryById(id: string) {
    return recipeCategories.find(category => category.id === id)
  }

  // TODO: каждый раз загружаются категории, сохранить в store
  async function loadCategories() {
    const categories: RecipeCategory[] = await fetchCategories()
    setRecipeCategories(categories)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    async function onFetchRecipes() {
      try {
        await fetchRecipes({ categories, searchQuery })
      } catch (error) {
        catchHttpError(error, setError)
      }
    }

    if (!filtersIsOpen) onFetchRecipes()
  }, [categories, searchQuery, filtersIsOpen, fetchRecipes])

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery, setSearchQuery])

  return (
    <>
      <div className="flex gap-2 pt-2 pb-1">
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
          badge={filtersCount}
        />
      </div>

      <Filters
        open={filtersIsOpen}
        setClose={() => setFiltersIsOpen(false)}
        setTempSearchQuery={setTempSearchQuery}
        recipeCategories={recipeCategories}
        findCategoryById={findCategoryById}
      />

      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {categories.length === 0 && !searchQuery && (
          <>
            <Categories categories={recipeCategories} />

            {status === 'error' ? (
              <p className="headline-medium mt-3">Не удалось загрузить рецепты</p>
            ) : (
              <FeaturedRecipes categories={recipeCategories} recipes={recipes} status={status} />
            )}
          </>
        )}

        {/* Показ результатов поиска или выбранной категории */}
        {(categories.length > 0 || searchQuery) && (
          <>
            <RecipesList
              title={
                searchQuery || categories.length !== 1
                  ? 'Найдены рецепты:'
                  : findCategoryById(categories[0])?.fullName || 'Заголовок категории не найден'
              }
              recipes={recipes}
              status={status}
            />
          </>
        )}

        <ErrorComponent className="mt-1" error={error} />
      </div>
    </>
  )
}
