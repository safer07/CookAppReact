import { useState } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '@/shared/lib'

import { useFavorites } from '../store/favoritesStore'

type LikeButtonProps = {
  itemId: string
  className?: string
}

const likeButtonVariants = cva(
  'surface-default relative grid size-5 shrink-0 place-content-center rounded-full transition-colors duration-300',
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
  const { favorites, addFavoriteRecipe, removeFavoriteRecipe } = useFavorites()
  const favoriteRecipes = favorites.recipes
  const [animation, setAnimation] = useState<boolean>(false)
  const isActive: boolean = favoriteRecipes.includes(itemId)

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (favoriteRecipes.includes(itemId)) removeFavoriteRecipe(itemId)
    else addFavoriteRecipe(itemId)

    setAnimation(true)
  }

  return (
    <button
      className={cn(likeButtonVariants({ active: isActive }), className)}
      onClick={onClick}
      aria-label={isActive ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {!isActive ? (
        <svg className="size-3" aria-hidden="true">
          <use href="/images/icons.svg#heart" />
        </svg>
      ) : (
        <img
          className={cn({ 'size-3 animate-blink': animation })}
          src="/images/icons/heart_filled.svg"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
