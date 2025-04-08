import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createRecipeDTOSchema, recipesService } from '@/entities/recipe'

import { catchHttpError, formatZodError } from '@/shared/lib'

import type { CreateRecipeStoreState } from '../model/createRecipeStore'

export const emptyStep = { description: '', ingredients: [], img: '' }

const initialRecipeData = {
  name: '',
  categoryId: 0,
  img: '',
  time: null,
  difficulty: 0,
  description: '',
  totalIngredients: [],
  steps: [emptyStep],
  hidden: false,
}

export const createRecipeStore = create<CreateRecipeStoreState>()(
  persist(
    devtools((set, get) => ({
      recipe: initialRecipeData,
      status: 'init',
      error: null,

      fetchRecipe: () => {},
      saveRecipe: async () => {
        set({ error: null })
        const result = createRecipeDTOSchema.safeParse(get().recipe)
        if (!result.success) return set({ error: { errors: formatZodError(result) } })

        try {
          set({ status: 'loading' })
          const response = await recipesService.create(result.data)
          set({ status: 'success' })
          set({ recipe: initialRecipeData })
          return response.recipe
        } catch (error) {
          set({ status: 'error' })
          set({ error: catchHttpError(error) })
        }
      },
      setName: value =>
        set((state: CreateRecipeStoreState) => ({ recipe: { ...state.recipe, name: value } })),
      setCategoryId: value =>
        set((state: CreateRecipeStoreState) => ({
          recipe: { ...state.recipe, categoryId: +value },
        })),
      setImg: value =>
        set((state: CreateRecipeStoreState) => ({ recipe: { ...state.recipe, img: value } })),
      setTime: value =>
        set((state: CreateRecipeStoreState) => ({ recipe: { ...state.recipe, time: value } })),
      setDifficulty: value =>
        set((state: CreateRecipeStoreState) => ({
          recipe: { ...state.recipe, difficulty: value },
        })),
      setDescription: value =>
        set((state: CreateRecipeStoreState) => ({
          recipe: { ...state.recipe, description: value },
        })),
      setTotalIngredients: value =>
        set((state: CreateRecipeStoreState) => ({
          recipe: { ...state.recipe, totalIngredients: value },
        })),
      setSteps: value =>
        set((state: CreateRecipeStoreState) => ({ recipe: { ...state.recipe, steps: value } })),
      setHidden: value =>
        set((state: CreateRecipeStoreState) => ({ recipe: { ...state.recipe, hidden: value } })),
      setError: value => set({ error: value }),
      resetCreateRecipe: () => set({ recipe: initialRecipeData }),
    })),
    { name: 'createRecipeStore', version: 1 },
  ),
)

export type CreateRecipeStore = typeof createRecipeStore
