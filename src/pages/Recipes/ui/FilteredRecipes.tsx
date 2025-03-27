import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { Recipe, findCategoryById, recipesService, useCategories } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'

import { useCatalog } from '../store/catalogStore'

export default function FilteredRecipes({
  filtersIsOpen,
}: {
  filtersIsOpen: boolean
}): React.JSX.Element {
  const { filters } = useCatalog()
  const { categories: filteredCategories, searchQuery } = filters
  const { categories } = useCategories()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setStatus('loading')
        const recipes = await recipesService.getRecipes(filters)
        setRecipes(recipes)
        setStatus('success')
      } catch (error) {
        setStatus('error')
        catchHttpError(error, setError)
      }
    }

    if (!filtersIsOpen) fetchRecipes()
  }, [filters, filtersIsOpen])

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
