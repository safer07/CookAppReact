import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { API_PATHS } from '@/shared/config'
import api from '@/shared/api'

type FullRecipeStore = {
  recipe: IFullRecipeItem | null
  status: 'init' | 'loading' | 'success' | 'error'
  fetchFullRecipe: (id: string) => Promise<void>
}

const useFullRecipe = create<FullRecipeStore>()(
  devtools((set) => ({
    recipe: null,
    status: 'init',
    fetchFullRecipe: async (id) => {
      try {
        set({ status: 'loading' })
        const { data } = await api.get<IFullRecipeItem>(`${API_PATHS.recipes.getOne}/${id}`)
        set({ recipe: data })
        set({ status: 'success' })
      } catch (error) {
        set({ status: 'error' })
        console.error(error)
      }
    },
  })),
)

export default useFullRecipe
