import { Link } from 'react-router-dom'

import { LikeButton } from '@/entities/favorites/@x/recipe'
import { useUser } from '@/entities/user/@x/recipe'

import { minsToHoursAndMins } from '@/shared/lib'
import Image from '@/shared/ui/image'
import Tag from '@/shared/ui/tag'

import { getRecipeDifficultyTextAndSurface } from '../../lib/get-recipe-difficulty-text-and-surface'
import { useCategories } from '../../lib/use-categories'
import type { Recipe } from '../../model/recipe'
import RecipeCardSkeleton from './RecipeCardSkeleton'

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): React.JSX.Element {
  const { categories, isPending } = useCategories()
  const { user } = useUser()
  const isAuthor = user?.id === recipe.authorId
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe?.difficulty,
  )

  const recipeCategory = categories.find(category => category.id === recipe.categoryId)

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
        {recipe.hidden && (
          <Tag
            className="absolute right-1.5 bottom-1.5"
            text="Рецепт скрыт"
            surface="surface-yellow"
          />
        )}
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small group-hover:text-primary line-clamp-2 h-[calc(var(--h3-line-height)*2)] transition-colors duration-300">
          {recipe.name}
        </h3>
        {isPending ? (
          <span className="skeleton h-3 w-10 rounded" />
        ) : (
          <p className="text-txt-secondary">{recipeCategory?.fullName}</p>
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
