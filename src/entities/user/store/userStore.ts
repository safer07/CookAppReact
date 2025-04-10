import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { useFavorites } from '@/entities/favorites/@x/user'

import { ACCESS_TOKEN_KEY } from '@/shared/config'

import { userService } from '../api/userService'
import type { UserStore } from '../model/store'

export const useUser = create<UserStore>()(
  persist(
    devtools(
      immer(set => ({
        user: null,
        status: 'init',
        setUser: value => set({ user: value }),
        setStatus: value => set({ status: value }),
        registration: async authUserDTO => {
          try {
            const payload = { ...authUserDTO, favorites: useFavorites.getState().favorites }
            set({ status: 'loading' })
            const response = await userService.registration(payload)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            useFavorites.getState().getFavorites()
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        login: async authUserDTO => {
          try {
            set({ status: 'loading' })
            const response = await userService.login(authUserDTO)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            useFavorites.getState().getFavorites()
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
            useFavorites.getState().resetFavorites()
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        fetchUser: async () => {
          try {
            set({ status: 'loading' })
            const user = await userService.getProfile()
            set({ user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        updateProfile: async (id, updateProfileDTO) => {
          set({ user: await userService.updateProfile(id, updateProfileDTO) })
        },
        resetPassword: async (link, password) => {
          const response = await userService.resetPassword(link, password)
          localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
          set({ user: response.user })
        },
        changePassword: async password => {
          await userService.changePassword(password)
        },
      })),
    ),
    { name: 'userStore', version: 1 },
  ),
)
