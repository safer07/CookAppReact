import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'

import { recipesService } from '@/entities/recipe'
import type { Recipe, RecipeCategory } from '@/entities/recipe'

import type { HttpStatus } from '@/shared/model'

import { useCatalog } from '../store/catalogStore'

export default function FeaturedRecipesList({
  category,
}: {
  category: RecipeCategory
}): React.JSX.Element {
  const setFilteredCategories = useCatalog(state => state.setFilteredCategories)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setStatus('loading')
        const recipes = await recipesService.getRecipes({ categories: [category.id] }, 5)
        setRecipes(recipes)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }

    fetchRecipes()
  }, [category])

  return (
    <div className="mt-3" key={category.id}>
      <RecipesList
        title={category.fullName}
        recipes={recipes}
        status={status}
        button={{
          text: 'Смотреть все',
          onClick: () => setFilteredCategories([category.id]),
        }}
      />
    </div>
  )
}
