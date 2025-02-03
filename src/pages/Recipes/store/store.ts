import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { RecipesStore } from '../model/store'
import recipesService from '@/entities/recipe/api'

const initialFilters = { categoryId: null, searchQuery: '' }

const useRecipes = create<RecipesStore>()(
  devtools(
    immer((set) => ({
      items: [],
      status: 'init',
      filters: initialFilters,
      fetchRecipes: async (filters) => {
        try {
          set({ status: 'loading' })
          const recipes = await recipesService.getRecipes(filters)
          set({ items: recipes })
          set({ status: 'success' })
        } catch (error) {
          set({ status: 'error' })
          throw error
        }
      },
      setCategoryId: (id) =>
        set((state) => {
          state.filters.categoryId = id
        }),
      setSearchQuery: (query) =>
        set((state) => {
          state.filters.searchQuery = query
        }),
      resetFilters: () => set({ filters: initialFilters }),
    })),
  ),
)

export default useRecipes
