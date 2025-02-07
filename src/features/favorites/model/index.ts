export type UserFavorites = { recipes: string[] }

export type FavoritesStore = {
  favorites: UserFavorites
  addFavoriteRecipe: (id: string) => Promise<void>
  removeFavoriteRecipe: (id: string) => Promise<void>
  setFavorites: (favorites: UserFavorites) => void
  resetFavorites: () => void
}
