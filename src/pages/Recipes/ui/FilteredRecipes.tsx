import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { findCategoryById, useCategories } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import { CustomError } from '@/shared/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'

import { useCatalog } from '../store/catalogStore'

export default function FilteredRecipes({
  filtersIsOpen,
}: {
  filtersIsOpen: boolean
}): React.JSX.Element {
  const { items: recipes, status, filters, fetchRecipes } = useCatalog()
  const { categories: filteredCategories, searchQuery } = filters
  const { categories } = useCategories()
  const [error, setError] = useState<CustomError>(null)

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

  return (
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

      <ErrorComponent className="mt-1" error={error} />
    </>
  )
}
