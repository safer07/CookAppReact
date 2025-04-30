import { useState } from 'react'

import { cva } from 'class-variance-authority'

import { useUser } from '@/entities/user/@x/favorites'

import { queryClient } from '@/shared/api'
import { cn } from '@/shared/lib'

import { useFetchFavoriteRecipes } from '../lib/use-fetch-favorite-recipes'
import { useLikeRecipe } from '../lib/use-like-recipe'
import { useUnlikeRecipe } from '../lib/use-unlike-recipe'
import { useFavorites } from '../store/favorites-store'

type LikeButtonProps = {
  itemId: string
  className?: string
}

const likeButtonVariants = cva(
  'surface-default relative grid size-5 place-content-center rounded-full transition-colors duration-300',
  {
    variants: {
      active: {
        false:
          'hover:text-pink-highGradient hover:*:drop-shadow-[0_2px_6px_rgb(255_107_161_/_0.5)]',
        true: 'hover:*:drop-shadow-[0_2px_6px_rgb(255_107_161_/_0.5)]',
      },
    },
  },
)

export default function LikeButton({ itemId, className }: LikeButtonProps): React.JSX.Element {
  const { user } = useUser()
  const { userFavorites, isLoading } = useFetchFavoriteRecipes()
  const { favorites, addFavoriteRecipe, removeFavoriteRecipe } = useFavorites()
  const [animation, setAnimation] = useState<boolean>(false)
  const isActive: boolean = user
    ? userFavorites.includes(itemId)
    : favorites.recipes.includes(itemId)
  const [isOptimistic, setIsOptimistic] = useState<boolean>(isActive)
  const { mutate: likeRecipe } = useLikeRecipe(itemId, setIsOptimistic, isActive)
  const { mutate: unlikeRecipe } = useUnlikeRecipe(itemId, setIsOptimistic, isActive)

  async function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsOptimistic(prev => !prev)
    setAnimation(true)
    if (!user) {
      try {
        if (isActive) await removeFavoriteRecipe(itemId)
        else await addFavoriteRecipe(itemId)
        queryClient.invalidateQueries({ queryKey: ['recipes', 'favorites', 'unauthorized'] })
      } catch {
        setIsOptimistic(isActive)
      }
    } else {
      if (isActive) unlikeRecipe()
      else likeRecipe()
    }
  }

  return isLoading ? (
    <div
      className={cn(
        'surface-default relative grid size-5 place-content-center rounded-full',
        className,
      )}
    >
      <div className="skeleton size-3 rounded-full" />
    </div>
  ) : (
    <button
      className={cn(likeButtonVariants({ active: isOptimistic }), className)}
      onClick={onClick}
      aria-label={isOptimistic ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {!isOptimistic ? (
        <svg className="size-3" aria-hidden="true">
          <use href="/images/icons.svg#heart" />
        </svg>
      ) : (
        <img
          className={cn({ 'animate-blink size-3': animation })}
          src="/images/icons/heart_filled.svg"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
