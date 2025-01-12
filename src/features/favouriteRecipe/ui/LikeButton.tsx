import { useState } from 'react'

import useUser from '@/entities/user/store/store'

type LikeButtonProps = {
  itemId: string
  className?: string
}

export default function LikeButton({ itemId, className = '' }: LikeButtonProps): JSX.Element {
  const favouriteRecipes = useUser((state) => state.favouriteRecipes)
  const addFavouriteRecipe = useUser((state) => state.addFavouriteRecipe)
  const removeFavouriteRecipe = useUser((state) => state.removeFavouriteRecipe)
  const [animation, setAnimation] = useState<boolean>(false)
  const isActive: boolean = favouriteRecipes.includes(itemId)

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    // TODO: это сохраняет в state, а нужно делать fetch на API
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
