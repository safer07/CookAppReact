import { useEffect, useState } from 'react'

import { fetchCategories } from '@/app/api'
import useRecipes from '../store/store'
import Categories from './Categories'
import Filters from './Filters'
import RecipesList from '@/widgets/RecipesList'
import useDebounce from '@/shared/hooks/debounce'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import Input from '@/shared/ui/Input'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import { CustomError } from '@/shared/model/customError'
import catchHttpError from '@/shared/utils/catchHttpError'

// TODO: убрать импорт из app

export default function Catalog(): JSX.Element {
  const {
    items: recipes,
    status,
    filters,
    fetchRecipes,
    setCategoryId,
    setSearchQuery,
  } = useRecipes()
  const { categoryId, searchQuery } = filters
  const [filtersIsOpen, setFiltersIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<CustomError>(null)
  const filtersCount = Object.values(filters).filter((value) => value).length
  const [recipeCategories, setRecipeCategories] = useState<IRecipeCategoryItem[]>([])
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
  const debouncedSearchQuery: string =
    tempSearchQuery === '' ? useDebounce(tempSearchQuery, 0) : useDebounce(tempSearchQuery, 1000)

  function findCategoryById(id: string) {
    return recipeCategories.find((category) => category.id === id)
  }

  async function onFetchRecipes() {
    try {
      await fetchRecipes({ categoryId, searchQuery })
    } catch (error) {
      catchHttpError(error, setError)
    }
  }

  useEffect(() => {
    // TODO: каждый раз загружаются категории, сохранить в store
    async function loadCategories() {
      const categories: IRecipeCategoryItem[] = await fetchCategories()
      setRecipeCategories(categories)
    }
    loadCategories()
  }, [])

  useEffect(() => {
    onFetchRecipes()
  }, [categoryId, searchQuery])

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery)
  }, [debouncedSearchQuery])

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
        {categoryId === null && !searchQuery && (
          <>
            <Categories categories={recipeCategories} />

            {status === 'error' ? (
              <h2 className="headline-medium mt-3">Не удалось загрузить рецепты</h2>
            ) : (
              recipeCategories.map((category) => (
                <div className="mt-3" key={category.id}>
                  <RecipesList
                    title={category.fullName}
                    recipes={recipes.filter((recipe) => recipe.category === category.id)}
                    status={status}
                    button={{
                      name: 'Смотреть все',
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
                  ? 'Найдены рецепты:'
                  : findCategoryById(categoryId!)?.fullName || 'Заголовок категории не найден'
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
