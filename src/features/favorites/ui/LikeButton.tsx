import { useState } from 'react'

import { useFavorites } from '../store/favoritesStore'

type LikeButtonProps = {
  itemId: string
  className?: string
}

export default function LikeButton({ itemId, className = '' }: LikeButtonProps): React.JSX.Element {
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
