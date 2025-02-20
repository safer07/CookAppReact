import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'
import { recipesService, type Recipe } from '@/entities/recipe'
import { catchHttpError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import ErrorComponent from '@/shared/ui/ErrorComponent'

type SimilarRecipesProps = {
  excludeId: string
}

export default function SimilarRecipes({ excludeId }: SimilarRecipesProps): React.JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)

  async function fetchRecipes() {
    setError(null)

    try {
      setError(null)
      setStatus('loading')
      const data = await recipesService.getSimilarRecipes(excludeId)
      setStatus('success')
      setRecipes(data)
    } catch (error) {
      setStatus('error')
      catchHttpError(error, setError)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [excludeId])

  return (
    <div className="py-2">
      <RecipesList title="Другие рецепты" recipes={recipes} status={status} />
      <ErrorComponent className="mt-1" error={error} />
    </div>
  )
}
