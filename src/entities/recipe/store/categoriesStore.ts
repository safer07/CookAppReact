import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { HttpStatus } from '@/shared/model'

import { recipesService } from '../api/recipeService'
import type { RecipeCategory } from '../model/recipeCategory'

type CategoriesStore = {
  categories: RecipeCategory[]
  status: HttpStatus
  getCategories: () => Promise<void>
}

export const useCategories = create<CategoriesStore>()(
  devtools(
    immer(set => ({
      categories: [],
      status: 'init',
      getCategories: async () => {
        try {
          set({ status: 'loading' })
          const response = await recipesService.getCategories()
          set({ categories: response })
          set({ status: 'success' })
        } catch {
          set({ status: 'error' })
          // TODO: toast?
          alert('Не удалось загрузить категории рецептов')
        }
      },
    })),
  ),
)
