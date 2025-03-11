export type UserFavorites = { recipes: string[] }

export type FavoritesStore = {
  favorites: UserFavorites
  getFavorites: () => Promise<void>
  addFavoriteRecipe: (id: string) => Promise<void>
  removeFavoriteRecipe: (id: string) => Promise<void>
  resetFavorites: () => void
}
