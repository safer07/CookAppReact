import { Link } from 'react-router-dom'

import { LikeButton } from '@/entities/favorites/@x/recipe'
import { useUser } from '@/entities/user/@x/recipe'

import { minsToHoursAndMins } from '@/shared/lib'
import Image from '@/shared/ui/image'
import Tag from '@/shared/ui/tag'

import { getRecipeDifficultyTextAndSurface } from '../../lib/get-recipe-difficulty-text-and-surface'
import { getRecipeStatusTagSurface } from '../../lib/get-recipe-status-tag-surface'
import { getRecipeStatusText } from '../../lib/get-recipe-status-text'
import { useCategories } from '../../lib/use-categories'
import type { Recipe } from '../../model/recipe'
import RecipeCardSkeleton from './RecipeCardSkeleton'

type RecipeCardProps = { recipe: Recipe }

export default function RecipeCard({ recipe }: RecipeCardProps): React.JSX.Element {
  const { categories, isPending } = useCategories()
  const { user } = useUser()
  const isAuthor = user?.id === recipe.authorId
  const recipeCategory = categories.find(category => category.id === recipe.categoryId)
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe?.difficulty,
  )

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="surface-default group hover:shadow-glow hover:shadow-primary overflow-hidden rounded-2xl shadow-sm transition-all duration-300"
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <Image
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={recipe.img}
            alt={recipe.name}
          />
        </div>
        {!isAuthor && <LikeButton itemId={recipe.id} className="absolute top-1.5 right-1.5" />}
        <div className="absolute right-1.5 bottom-1.5 flex flex-col items-end gap-1">
          {recipe.hidden && <Tag text="Рецепт скрыт" surface="surface-yellow" />}
          {recipe.status && (
            <Tag
              text={getRecipeStatusText(recipe.status)}
              surface={getRecipeStatusTagSurface(recipe.status)}
            />
          )}
        </div>
        {isPending ? (
          <div className="surface-default absolute bottom-0 left-0 flex h-4 items-center rounded-tr-xl px-2 py-0.5">
            <span className="skeleton flex h-2.5 w-10 rounded" />
          </div>
        ) : (
          <span className="surface-default text-txt-secondary absolute bottom-0 left-0 rounded-tr-xl px-2 py-0.5">
            {recipeCategory?.fullName}
          </span>
        )}
      </div>
      <div className="mx-2 my-1.5 grid gap-1">
        <h3 className="headline-small group-hover:text-primary line-clamp-2 h-[calc(var(--headline-small-line-height)*2)] text-balance transition-colors duration-300">
          {recipe.name}
        </h3>
        {recipe.moderationMessage && (
          <p className="text-system-error">{recipe.moderationMessage}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="fill-primary size-2">
              <use href="/images/icons.svg#clock" />
            </svg>
            <div className="label-small text-txt-secondary">{minsToHoursAndMins(recipe.time)}</div>
          </div>
          <Tag text={difficultyText} surface={tagDifficultySurface} />
        </div>
      </div>
    </Link>
  )
}

RecipeCard.Skeleton = RecipeCardSkeleton
