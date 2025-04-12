import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { CatalogStore } from '../model/store'

const initialFilters = { categories: [], searchQuery: '', difficulties: [] }

export const useCatalog = create<CatalogStore>()(
  devtools(
    immer(set => ({
      filters: initialFilters,
      setCategories: categories =>
        set(state => {
          state.filters.categories = categories
        }),
      setSearchQuery: query =>
        set(state => {
          state.filters.searchQuery = query
        }),
      setDifficulties: difficulties =>
        set(state => {
          state.filters.difficulties = difficulties
        }),
      resetFilters: () => set({ filters: initialFilters }),
    })),
  ),
)
