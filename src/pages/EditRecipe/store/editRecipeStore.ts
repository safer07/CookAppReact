import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { recipesService, updateRecipeDTOSchema } from '@/entities/recipe'

import { catchHttpError, formatZodError } from '@/shared/lib'

import type { EditRecipeStoreState } from '../model/editRecipeStore'

export const emptyStep = { description: '', ingredients: [], img: '' }

const initialRecipeData = {
  id: null,
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

export const editRecipeStore = create<EditRecipeStoreState>()(
  devtools((set, get) => ({
    recipe: initialRecipeData,
    status: 'init',
    error: null,

    // TODO: брать из query
    fetchRecipe: async id => {
      try {
        set({ status: 'loading' })
        set({ error: null })
        const recipe = await recipesService.getFullRecipe(id)
        set({ recipe: { ...recipe, hidden: recipe.hidden ?? false } })
        set({ status: 'success' })
      } catch (error) {
        set({ status: 'error' })
        set({ error: catchHttpError(error) })
      }
    },
    saveRecipe: async () => {
      set({ error: null })
      const result = updateRecipeDTOSchema.safeParse(get().recipe)
      if (!result.success) return set({ error: { errors: formatZodError(result) } })

      try {
        set({ status: 'loading' })
        const response = await recipesService.update(result.data)
        set({ status: 'success' })
        return response.recipe
      } catch (error) {
        set({ status: 'error' })
        set({ error: catchHttpError(error) })
      }
    },
    setName: value =>
      set((state: EditRecipeStoreState) => ({ recipe: { ...state.recipe, name: value } })),
    setCategoryId: value =>
      set((state: EditRecipeStoreState) => ({
        recipe: { ...state.recipe, categoryId: +value },
      })),
    setImg: value =>
      set((state: EditRecipeStoreState) => ({ recipe: { ...state.recipe, img: value } })),
    setTime: value =>
      set((state: EditRecipeStoreState) => ({ recipe: { ...state.recipe, time: value } })),
    setDifficulty: value =>
      set((state: EditRecipeStoreState) => ({
        recipe: { ...state.recipe, difficulty: value },
      })),
    setDescription: value =>
      set((state: EditRecipeStoreState) => ({
        recipe: { ...state.recipe, description: value },
      })),
    setTotalIngredients: value =>
      set((state: EditRecipeStoreState) => ({
        recipe: { ...state.recipe, totalIngredients: value },
      })),
    setSteps: value =>
      set((state: EditRecipeStoreState) => ({ recipe: { ...state.recipe, steps: value } })),
    setHidden: value =>
      set((state: EditRecipeStoreState) => ({ recipe: { ...state.recipe, hidden: value } })),
    setError: value => set({ error: value }),
    resetCreateRecipe: () => {},
  })),
)

export type EditRecipeStore = typeof editRecipeStore
