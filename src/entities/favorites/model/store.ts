type Favorites = { recipes: string[] }

export type FavoritesStore = {
  favorites: Favorites
  getFavorites: () => Promise<void>
  addFavoriteRecipe: (id: string) => Promise<void>
  removeFavoriteRecipe: (id: string) => Promise<void>
  resetFavorites: () => void
}
