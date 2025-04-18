import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { recipesService } from '@/entities/recipe'

import { queryClient } from '@/shared/api'

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
  devtools(set => ({
    recipe: initialRecipeData,

    fetchRecipe: async id => {
      const recipe = await queryClient.fetchQuery({
        queryKey: ['recipe', id],
        queryFn: () => recipesService.getFullRecipe(id),
        meta: { errorMessage: 'Не удалось загрузить параметры рецепта' },
      })
      set({ recipe: { ...recipe, hidden: recipe.hidden ?? false } })
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
  })),
)

export type EditRecipeStore = typeof editRecipeStore
