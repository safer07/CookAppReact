import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'

import { backendUrl } from '@/shared/config'

export type UserType = {
  _id: string
  name: string
  lastName: string
  email: string
  avatarUrl: string
  gender: 'male' | 'female'
  birthDate: string
} | null

type StatusType = 'init' | 'loading' | 'success' | 'error'

type UserStore = {
  user: UserType
  accessToken: string | null
  status: StatusType
  setUser: (value: UserType) => void
  setAccessToken: (accessToken: string | null) => void
  setStatus: (value: StatusType) => void
  // fetchUser: (id: string) => Promise<void>
  favouriteRecipes: string[]
  addFavouriteRecipe: (id: string) => void
  removeFavouriteRecipe: (id: string) => void
}

const useUser = create<UserStore>()(
  persist(
    devtools(
      immer((set) => ({
        user: null,
        accessToken: null,
        status: 'init',
        setUser: (value) => set({ user: value }),
        setAccessToken: (value) => set({ accessToken: value }),
        setStatus: (value) => set({ status: value }),
        // fetchUser: async (id) => {
        //   try {
        //     set({ status: 'loading' })
        //     const url = `${backendUrl}/recipes/${id}`
        //     const response = await axios.get<IFullRecipeItem>(url)
        //     set({ recipe: response.data })
        //     set({ status: 'success' })
        //   } catch (error) {
        //     set({ status: 'error' })
        //     console.error(error)
        //   }
        // },
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
            state.favouriteRecipes = state.favouriteRecipes.filter((item) => item !== id)
          }),
      })),
    ),
    { name: 'userStore', version: 1 },
  ),
)

export default useUser
