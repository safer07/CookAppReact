import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { useUser } from '@/entities/user'

import { favoritesService } from '../api'
import type { FavoritesStore } from '../model'

const emptyFavorites = { recipes: [] }

export const useFavorites = create<FavoritesStore>()(
  persist(
    devtools(
      immer((set) => ({
        favorites: emptyFavorites,
        addFavoriteRecipe: async (id) => {
          if (useUser.getState().user) {
            try {
              const favoriteRecipes = await favoritesService.addRecipe(id)
              set((state) => {
                state.favorites.recipes = favoriteRecipes
              })
            } catch (error) {}
          } else
            set((state) => {
              state.favorites.recipes.push(id)
            })
        },
        removeFavoriteRecipe: async (id) => {
          if (useUser.getState().user) {
            try {
              const favoriteRecipes = await favoritesService.removeRecipe(id)
              set((state) => {
                state.favorites.recipes = favoriteRecipes
              })
            } catch (error) {}
          } else {
            set((state) => {
              state.favorites.recipes = state.favorites.recipes.filter((item) => item !== id)
            })
          }
        },
        setFavorites: (favorites) => set({ favorites }),
        resetFavorites: () => set({ favorites: emptyFavorites }),
      })),
    ),
    { name: 'favoritesStore', version: 1 },
  ),
)
