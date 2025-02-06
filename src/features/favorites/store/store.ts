import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import favoritesService from '../api'
import { FavoritesStore } from '../model'
import useUser from '@/entities/user/store/store'

const emptyFavorites = { recipes: [] }

const useFavorites = create<FavoritesStore>()(
  persist(
    devtools(
      immer((set) => ({
        favorites: emptyFavorites,
        addFavouriteRecipe: async (id) => {
          if (useUser.getState().user) {
            try {
              const favouriteRecipes = await favoritesService.addRecipe(id)
              set((state) => {
                state.favorites.recipes = favouriteRecipes
              })
            } catch (error) {}
          } else
            set((state) => {
              state.favorites.recipes.push(id)
            })
        },
        removeFavouriteRecipe: async (id) => {
          if (useUser.getState().user) {
            try {
              const favouriteRecipes = await favoritesService.removeRecipe(id)
              set((state) => {
                state.favorites.recipes = favouriteRecipes
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

export default useFavorites
