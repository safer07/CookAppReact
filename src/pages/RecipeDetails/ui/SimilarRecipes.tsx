import { useEffect, useState } from 'react'

import RecipesList from '@/widgets/RecipesList'
import recipesService from '@/entities/recipe/api'
import { Recipe } from '@/entities/recipe/model'
import catchHttpError from '@/shared/utils/catchHttpError'
import { CustomError } from '@/shared/model/customError'
import ErrorComponent from '@/shared/ui/ErrorComponent'

type SimilarRecipesProps = {
  excludeId: string
}

type Status = 'init' | 'loading' | 'success' | 'error'

export default function SimilarRecipes({ excludeId }: SimilarRecipesProps): JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [status, setStatus] = useState<Status>('init')
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
