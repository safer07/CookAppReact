import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import getFullRecipe from '../api'
import { FullRecipe } from '@/entities/recipe/model'
import catchHttpError from '@/shared/utils/catchHttpError'
import { CustomError } from '@/shared/model/customError'

type FullRecipeStore = {
  recipe: FullRecipe | null
  status: 'init' | 'loading' | 'success' | 'error'
  fetchFullRecipe: (id: string) => Promise<void>
  error: CustomError
}

const useFullRecipe = create<FullRecipeStore>()(
  devtools((set) => ({
    recipe: null,
    status: 'init',
    fetchFullRecipe: async (id) => {
      try {
        set({ status: 'loading' })
        set({ error: null })
        const recipe = await getFullRecipe(id)
        set({ recipe })
        set({ status: 'success' })
      } catch (error) {
        set({ status: 'error' })
        set({ error: catchHttpError(error) })
      }
    },
    error: null,
  })),
)

export default useFullRecipe
