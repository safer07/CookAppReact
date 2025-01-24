import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import userService from '../api'
import { UserStore } from '../model'
import { ACCESS_TOKEN_KEY } from '@/shared/config'

const useUser = create<UserStore>()(
  persist(
    devtools(
      immer((set) => ({
        user: null,
        status: 'init',
        setUser: (value) => set({ user: value }),
        setStatus: (value) => set({ status: value }),
        registration: async (authUserDTO) => {
          try {
            set({ status: 'loading' })
            const response = await userService.registration(authUserDTO)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        login: async (authUserDTO) => {
          try {
            set({ status: 'loading' })
            const response = await userService.login(authUserDTO)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        logout: async () => {
          try {
            set({ status: 'loading' })
            await userService.logout()
            localStorage.removeItem(ACCESS_TOKEN_KEY)
            set({ user: null })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
          }
        },
        fetchUser: async () => {
          try {
            set({ status: 'loading' })
            const user = await userService.getProfile()
            set({ user })
            set({ status: 'success' })
          } catch (error) {
            // TODO: обнулять пользователя, если не удалось обновить данные?
            set({ status: 'error' })
          }
        },
        updateProfile: async (id, updateProfileDTO) => {
          try {
            set({ status: 'loading' })
            const user = await userService.updateProfile(id, updateProfileDTO)
            set({ user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
          }
        },
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
