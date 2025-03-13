import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { recipesService } from '@/entities/recipe'

import type { CatalogStore } from '../model/store'

const initialFilters = { categories: [], searchQuery: '' }

export const useCatalog = create<CatalogStore>()(
  devtools(
    immer(set => ({
      items: [],
      status: 'init',
      filters: initialFilters,
      fetchRecipes: async filters => {
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
      setFilteredCategories: categories =>
        set(state => {
          state.filters.categories = categories
        }),
      setSearchQuery: query =>
        set(state => {
          state.filters.searchQuery = query
        }),
      resetFilters: () => set({ filters: initialFilters }),
    })),
  ),
)
