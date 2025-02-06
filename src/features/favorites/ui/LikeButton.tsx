import { useState } from 'react'

import useFavorites from '@/features/favorites/store/store'

type LikeButtonProps = {
  itemId: string
  className?: string
}

export default function LikeButton({ itemId, className = '' }: LikeButtonProps): JSX.Element {
  const { favorites, addFavouriteRecipe, removeFavouriteRecipe } = useFavorites()
  const favouriteRecipes = favorites.recipes
  const [animation, setAnimation] = useState<boolean>(false)
  const isActive: boolean = favouriteRecipes.includes(itemId)

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (favouriteRecipes.includes(itemId)) removeFavouriteRecipe(itemId)
    else addFavouriteRecipe(itemId)

    setAnimation(true)
  }

  return (
    <button className={`like-button ${className} ${isActive ? 'active' : ''}`} onClick={onClick}>
      {!isActive ? (
        <svg>
          <use href="/images/icons.svg#heart" />
        </svg>
      ) : (
        <img
          className={`${animation ? 'animate-blink' : ''}`}
          src="/images/icons/heart_filled.svg"
        />
      )}
    </button>
  )
}
