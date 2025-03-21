import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { findCategoryById, useCategories } from '@/entities/recipe'

import { catchHttpError, useDebounce } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

import { useCatalog } from '../store/catalogStore'
import Categories from './Categories'
import FeaturedRecipes from './FeaturedRecipes'
import Filters from './Filters'

export default function Catalog(): React.JSX.Element {
  const { categories, getCategories } = useCategories()
  const { items: recipes, status, filters, fetchRecipes, setSearchQuery } = useCatalog()
  const { categories: filteredCategories, searchQuery } = filters
  const [filtersIsOpen, setFiltersIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<CustomError>(null)
  const filtersCount = Object.values(filters).filter(value => value.length !== 0).length
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
  const debounceDelay = tempSearchQuery === '' ? 0 : 1000
  const debouncedSearchQuery = useDebounce(tempSearchQuery, debounceDelay)

  useEffect(() => {
    if (!categories.length) getCategories()
  }, [categories, getCategories])

  useEffect(() => {
    async function onFetchRecipes() {
      try {
        await fetchRecipes({ categories: filteredCategories, searchQuery })
      } catch (error) {
        catchHttpError(error, setError)
      }
    }

    if (!filtersIsOpen) onFetchRecipes()
  }, [filteredCategories, searchQuery, filtersIsOpen, fetchRecipes])

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
      />

      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {filteredCategories.length === 0 && !searchQuery && (
          <>
            <Categories />

            {status === 'error' ? (
              <p className="headline-medium mt-3">Не удалось загрузить рецепты</p>
            ) : (
              <FeaturedRecipes categories={categories} recipes={recipes} status={status} />
            )}
          </>
        )}

        {/* Показ результатов поиска или выбранной категории */}
        {(filteredCategories.length > 0 || searchQuery) && (
          <>
            <RecipesList
              title={
                searchQuery || filteredCategories.length !== 1
                  ? 'Найдены рецепты:'
                  : (findCategoryById(filteredCategories[0], categories)?.fullName ??
                    'Заголовок категории не найден')
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
