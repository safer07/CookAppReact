import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'

import { backendUrl } from '@/shared/config'

export type TypeRecipesStatus = 'init' | 'loading' | 'success' | 'error'

type RecipesFilters = {
  categoryId?: string | null
  searchQuery?: string
}

type RecipesStore = {
  items: IRecipeItem[]
  status: TypeRecipesStatus
  filters: RecipesFilters
  fetchRecipes: (filters?: RecipesFilters) => Promise<void>
  // устанавливать не id, а категории
  setCategoryId: (id: string | null) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

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
          // TODO: добавить возможность выбора несколько категорий
          axios.defaults.baseURL = backendUrl
          const response = await axios.get<IRecipeItem[]>(`/recipes`, {
            params: { category: filters?.categoryId, query: filters?.searchQuery },
          })
          set({ items: response.data })
          set({ status: 'success' })
        } catch (error) {
          set({ status: 'error' })
          console.error(error)
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
