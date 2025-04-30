import { useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/top-app-bar'

import { catchHttpError } from '@/shared/lib'
import Button from '@/shared/ui/button'
import ErrorComponent from '@/shared/ui/error-component'

import { useFullRecipe } from '../lib/use-full-recipe'
import RecipeInfo from './recipe-info'
import RecipeTabs from './recipe-tabs'
import SimilarRecipes from './similar-recipes'

export default function RecipeDetailsPage(): React.ReactNode {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { recipe, error: fetchError, isPending, isError } = useFullRecipe(id)
  const error = catchHttpError(fetchError)

  if (!id) return null

  return (
    <>
      {isPending && <RecipeInfo.Skeleton />}
      {isError && (
        <>
          <TopAppBar title="Не удалось загрузить рецепт" back />
          <ErrorComponent className="mt-1" error={error} />
        </>
      )}
      {recipe && (
        <>
          <RecipeInfo recipe={recipe} />
          <RecipeTabs recipe={recipe} />

          <div className="py-2">
            <Button
              text="Начать готовить"
              onClick={() => navigate(`/recipes/${id}/cooking-mode`, { replace: true })}
              variant="primary"
              fullWidth
            />
          </div>
        </>
      )}
      {!isPending && <SimilarRecipes excludeId={id} />}
    </>
  )
}
