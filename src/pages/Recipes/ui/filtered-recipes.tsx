import { useQuery } from '@tanstack/react-query'

import RecipesList from '@/widgets/recipes-list'

import { findCategoryById, recipesService, useCategories } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import ErrorComponent from '@/shared/ui/error-component'

import { useCatalog } from '../store/catalog-store'

export default function FilteredRecipes({
  filtersIsOpen,
}: {
  filtersIsOpen: boolean
}): React.JSX.Element {
  const { filters } = useCatalog()
  const { categories: filteredCategories, searchQuery } = filters
  const { categories } = useCategories()
  const {
    data: recipes = [],
    status,
    error: fetchError,
  } = useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => recipesService.getRecipes(filters),
    staleTime: 1000 * 60 * 60, // 60 минут
    enabled: !filtersIsOpen,
  })
  const error = catchHttpError(fetchError)

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
