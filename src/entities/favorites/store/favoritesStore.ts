import toast from 'react-hot-toast'

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { useUser } from '@/entities/user'

import { favoritesService } from '../api'
import type { FavoritesStore } from '../model/store'

const emptyFavorites = { recipes: [] }

export const useFavorites = create<FavoritesStore>()(
  persist(
    devtools(
      immer(set => ({
        favorites: emptyFavorites,
        getFavorites: async () => {
          try {
            const favorites = await favoritesService.getFavorites()
            set(state => {
              state.favorites = favorites
            })
          } catch {
            toast.error('Не удалось загрузить избранное')
          }
        },
        addFavoriteRecipe: async id => {
          if (useUser.getState().user) {
            try {
              const favoriteRecipes = await favoritesService.addRecipe(id)
              set(state => {
                state.favorites.recipes = favoriteRecipes
              })
            } catch (error) {
              toast.error('Не удалось добавить рецепт в избранное')
              throw error
            }
          } else
            set(state => {
              state.favorites.recipes.push(id)
            })
        },
        removeFavoriteRecipe: async id => {
          if (useUser.getState().user) {
            try {
              const favoriteRecipes = await favoritesService.removeRecipe(id)
              set(state => {
                state.favorites.recipes = favoriteRecipes
              })
            } catch (error) {
              toast.error('Не удалось удалить рецепт из избранного')
              throw error
            }
          } else {
            set(state => {
              state.favorites.recipes = state.favorites.recipes.filter(item => item !== id)
            })
          }
        },
        resetFavorites: () => set({ favorites: emptyFavorites }),
      })),
    ),
    { name: 'favoritesStore', version: 1 },
  ),
)
