import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { recipesService, type FullRecipe } from '@/entities/recipe'
import { catchHttpError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'

type FullRecipeStore = {
  recipe: FullRecipe | null
  status: HttpStatus
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
        const recipe = await recipesService.getFullRecipe(id)
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
