export type UserFavorites = { recipes: string[] }

export type FavoritesStore = {
  favorites: UserFavorites
  addFavouriteRecipe: (id: string) => Promise<void>
  removeFavouriteRecipe: (id: string) => Promise<void>
  setFavorites: (favorites: UserFavorites) => void
  resetFavorites: () => void
}
