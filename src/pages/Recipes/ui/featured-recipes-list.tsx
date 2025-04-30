import { useQuery } from '@tanstack/react-query'

import RecipesList from '@/widgets/recipes-list'

import { recipesService } from '@/entities/recipe'
import type { RecipeCategory } from '@/entities/recipe'

import { useCatalog } from '../store/catalog-store'

export default function FeaturedRecipesList({
  category,
}: {
  category: RecipeCategory
}): React.JSX.Element {
  const setCategories = useCatalog(state => state.setCategories)
  // TODO: сделать нормальные параметры
  const { data: recipes = [], status } = useQuery({
    queryKey: ['recipes', { categories: [category.id] }, { limit: 5 }],
    queryFn: () => recipesService.getRecipes({ categories: [category.id] }, 5),
    staleTime: 1000 * 60 * 60, // 60 минут
  })

  return (
    <div className="mt-3" key={category.id}>
      <RecipesList
        title={category.fullName}
        recipes={recipes}
        status={status}
        button={{
          text: 'Смотреть все',
          onClick: () => setCategories([category.id]),
        }}
      />
    </div>
  )
}
