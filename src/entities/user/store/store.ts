import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UserStore = {
  favouriteRecipes: string[]
  addFavouriteRecipe: (id: string) => void
  removeFavouriteRecipe: (id: string) => void
}

const useUser = create<UserStore>()(
  persist(
    devtools(
      immer((set) => ({
        favouriteRecipes: [
          '668b9ede0cc1f0dab6c84e42',
          '668b9ede0cc1f0dab6c84e47',
          '668b9ede0cc1f0dab6c84e49',
          '668b9ede0cc1f0dab6c84e4b',
        ],
        addFavouriteRecipe: (id) =>
          set((state) => {
            state.favouriteRecipes.push(id)
          }),
        removeFavouriteRecipe: (id) =>
          set((state) => {
            state.favouriteRecipes = state.favouriteRecipes.filter(
              (item) => item !== id,
            )
          }),
      })),
    ),
    { name: 'userStore', version: 1 },
  ),
)

export default useUser
