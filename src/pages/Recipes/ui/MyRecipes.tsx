import { RecipeCard } from '@/entities/recipe'
import { useUser } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import { CREATE_RECIPE_ROUTE, LOGIN_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'

import { useMyRecipes } from '../lib/useMyRecipes'

export default function MyRecipes() {
  const { user } = useUser()
  const { recipes, error: fetchError, isPending, isError } = useMyRecipes(user?.id)
  const skeletonRecipes = [...new Array(4)].map((_, i) => <RecipeCard.Skeleton key={i} />)
  const error = catchHttpError(fetchError)

  if (!user) {
    return (
      <>
        <p className="mt-2">Войдите или зарегистрируйтесь, чтобы создать рецепт</p>
        <Button className="mt-2" text="Войти" icon="login" link={LOGIN_ROUTE} />
      </>
    )
  }

  return (
    <>
      <div className="pt-1">
        <Button text="Добавить рецепт" icon="plus" fullWidth link={CREATE_RECIPE_ROUTE} />
      </div>
      <div className="mt-3 pb-2">
        <div>
          <h2 className="headline-medium">Мои рецепты</h2>
        </div>
        {!isPending && recipes.length < 1 && (
          <p className="mt-1">Список рецептов пуст. Создайте новый рецепт</p>
        )}
        {isError ? (
          <ErrorComponent className="mt-1" error={error} />
        ) : (
          <div className="mt-2 grid gap-2">
            {isPending
              ? skeletonRecipes
              : recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        )}
      </div>
    </>
  )
}
