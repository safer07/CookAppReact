import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import userService from '../api'
import { UserStore } from '../model/store'
import useFavorites from '@/features/favorites/store/store'
import { ACCESS_TOKEN_KEY } from '@/shared/config'

// TODO: не импортировать useFavorites (features) в entity

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
            const payload = { ...authUserDTO, favorites: useFavorites.getState().favorites }
            set({ status: 'loading' })
            const response = await userService.registration(payload)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            useFavorites.getState().setFavorites(response.user.favorites)
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
            useFavorites.getState().setFavorites(response.user.favorites)
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
          try {
            set({ status: 'loading' })
            const user = await userService.updateProfile(id, updateProfileDTO)
            set({ user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        resetPassword: async (link, password) => {
          try {
            set({ status: 'loading' })
            const response = await userService.resetPassword(link, password)
            localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
            set({ user: response.user })
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
        changePassword: async (password) => {
          try {
            set({ status: 'loading' })
            await userService.changePassword(password)
            set({ status: 'success' })
          } catch (error) {
            set({ status: 'error' })
            throw error
          }
        },
      })),
    ),
    { name: 'userStore', version: 1 },
  ),
)

export default useUser
