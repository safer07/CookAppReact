import { Link } from 'react-router-dom'

import { LikeButton } from '@/features/favorites'

import { categories } from '@/entities/recipeCategory/const/categories'
import { useUser } from '@/entities/user/@x/recipe'

import Tag from '@/shared/ui/Tag'

import { getRecipeDifficultyTextAndSurface } from '../../lib/getRecipeDifficultyTextAndSurface'
import type { Recipe } from '../../model/recipe'
import RecipeCardSkeleton from './RecipeCardSkeleton'

// TODO: не импортировать feature, а user импортировать через кросс-экспорт

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps): React.JSX.Element {
  const { user } = useUser()
  const isAuthor = user?._id === recipe.author
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe?.difficulty,
  )

  const recipeCategory = categories.find((category) => category.id === recipe.category)

  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="surface-default group hover:shadow-glow hover:shadow-primary overflow-hidden rounded-2xl shadow-sm transition-all duration-300"
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={recipe.img}
            alt={recipe.name}
          />
        </div>
        {!isAuthor && <LikeButton itemId={recipe._id} className="absolute top-1.5 right-1.5" />}
      </div>
      <div className="mx-2 my-1.5 grid gap-0.5">
        <h3 className="headline-small group-hover:text-primary line-clamp-2 h-[calc(var(--h3-line-height)*2)] transition-colors duration-300">
          {recipe.name}
        </h3>
        <p className="text-txt-secondary">{recipeCategory?.fullName}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="fill-primary size-2">
              <use href="/images/icons.svg#clock"></use>
            </svg>
            <div className="label-small text-txt-secondary">{recipe.time} минут</div>
          </div>
          <Tag text={difficultyText} surface={tagDifficultySurface} />
        </div>
      </div>
    </Link>
  )
}

RecipeCard.Skeleton = RecipeCardSkeleton
