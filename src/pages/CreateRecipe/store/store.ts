import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { CreateRecipeStore } from '../model'

export const emptyStep = { description: '', ingredients: [], img: '' }

const initialState = {
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

const useCreateRecipe = create<CreateRecipeStore>()(
  persist(
    devtools((set) => ({
      ...initialState,

      setName: (value) => set({ name: value }),
      setCategory: (value) => set({ category: value }),
      setImg: (value) => set({ img: value }),
      setTime: (value) => set({ time: value }),
      setDifficulty: (value) => set({ difficulty: value }),
      setDescription: (value) => set({ description: value }),
      setTotalIngredients: (value) => set({ totalIngredients: value }),
      setSteps: (value) => set({ steps: value }),
      setHidden: (value) => set({ hidden: value }),
      resetCreateRecipe: () => set(initialState),
    })),
    { name: 'createRecipeStore', version: 1 },
  ),
)

export default useCreateRecipe
