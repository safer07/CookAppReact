import { type Recipe, RecipeCard } from '@/entities/recipe'

import type { HttpStatus } from '@/shared/model'

type RecipesListProps = {
  title: string
  recipes: Recipe[]
  status: HttpStatus
  button?: { text: string; onClick: () => void }
}

export default function RecipesList({
  title,
  recipes,
  status,
  button,
}: RecipesListProps): React.JSX.Element {
  const skeletonRecipes = [...new Array(4)].map((_, i) => <RecipeCard.Skeleton key={i} />)

  return (
    <>
      {!button && (
        <h2 className="headline-medium">
          {status === 'error' ? 'Не удалось загрузить рецепты' : title}
        </h2>
      )}

      {button && (
        <div className="flex items-baseline justify-between">
          <h2 className="headline-medium">{title}</h2>
          <button className="text-primary hover:text-primary-active" onClick={button?.onClick}>
            {button?.text}
          </button>
        </div>
      )}

      {status !== 'error' && (
        <div className="mt-2 grid gap-2">
          {status === 'loading'
            ? skeletonRecipes
            : recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
          {status === 'success' && recipes.length === 0 && 'Рецепты не найдены'}
        </div>
      )}
    </>
  )
}
