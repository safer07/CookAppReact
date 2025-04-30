import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { FavoritesStore } from '../model/store'

const emptyFavorites = { recipes: [] }

export const useFavorites = create<FavoritesStore>()(
  persist(
    devtools(
      immer(set => ({
        favorites: emptyFavorites,
        addFavoriteRecipe: async id => {
          set(state => {
            state.favorites.recipes.push(id)
          })
        },
        removeFavoriteRecipe: async id => {
          set(state => {
            state.favorites.recipes = state.favorites.recipes.filter(item => item !== id)
          })
        },
        resetFavorites: () => set({ favorites: emptyFavorites }),
      })),
    ),
    { name: 'favoritesStore', version: 1 },
  ),
)
