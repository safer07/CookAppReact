import toast from 'react-hot-toast'

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { useUser } from '@/entities/user'

import { queryClient } from '@/shared/api'

import { favoritesService } from '../api'
import type { FavoritesStore } from '../model/store'

const emptyFavorites = { recipes: [] }

export const useFavorites = create<FavoritesStore>()(
  persist(
    devtools(
      immer(set => ({
        favorites: emptyFavorites,
        getFavorites: async () => {
          const user = useUser.getState().user
          const favorites = await queryClient.fetchQuery({
            queryKey: ['favorites', user?.id],
            queryFn: () => favoritesService.getFavorites(),
            meta: { errorMessage: 'Не удалось загрузить избранное' },
          })
          set(state => {
            state.favorites = favorites
          })
        },
        addFavoriteRecipe: async id => {
          const user = useUser.getState().user
          if (user) {
            try {
              const favoriteRecipes = await favoritesService.addRecipe(id)
              set(state => {
                state.favorites.recipes = favoriteRecipes
              })
              queryClient.invalidateQueries({ queryKey: ['recipes', 'favorites', user.id] })
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
          const user = useUser.getState().user
          if (user) {
            try {
              const favoriteRecipes = await favoritesService.removeRecipe(id)
              set(state => {
                state.favorites.recipes = favoriteRecipes
              })
              queryClient.invalidateQueries({ queryKey: ['recipes', 'favorites', user.id] })
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
