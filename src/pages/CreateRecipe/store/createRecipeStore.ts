import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { CreateRecipeStore } from '../model/store'

export const emptyStep = { description: '', ingredients: [], img: '' }

const initialRecipeData = {
  name: '',
  category: '',
  img: '',
  time: null,
  difficulty: 0,
  description: '',
  totalIngredients: [],
  steps: [emptyStep],
  hidden: false,
}

export const useCreateRecipe = create<CreateRecipeStore>()(
  persist(
    devtools((set) => ({
      recipeData: initialRecipeData,

      setName: (value) =>
        set((state: CreateRecipeStore) => ({ recipeData: { ...state.recipeData, name: value } })),
      setCategory: (value) =>
        set((state: CreateRecipeStore) => ({
          recipeData: { ...state.recipeData, category: value },
        })),
      setImg: (value) =>
        set((state: CreateRecipeStore) => ({ recipeData: { ...state.recipeData, img: value } })),
      setTime: (value) =>
        set((state: CreateRecipeStore) => ({ recipeData: { ...state.recipeData, time: value } })),
      setDifficulty: (value) =>
        set((state: CreateRecipeStore) => ({
          recipeData: { ...state.recipeData, difficulty: value },
        })),
      setDescription: (value) =>
        set((state: CreateRecipeStore) => ({
          recipeData: { ...state.recipeData, description: value },
        })),
      setTotalIngredients: (value) =>
        set((state: CreateRecipeStore) => ({
          recipeData: { ...state.recipeData, totalIngredients: value },
        })),
      setSteps: (value) =>
        set((state: CreateRecipeStore) => ({ recipeData: { ...state.recipeData, steps: value } })),
      setHidden: (value) =>
        set((state: CreateRecipeStore) => ({ recipeData: { ...state.recipeData, hidden: value } })),
      resetCreateRecipe: () => set({ recipeData: initialRecipeData }),
    })),
    { name: 'createRecipeStore', version: 1 },
  ),
)
