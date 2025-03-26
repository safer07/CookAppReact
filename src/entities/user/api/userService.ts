import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

import {
  type AuthUserDTO,
  type RegistrationUserDTO,
  type UpdateProfileDTO,
  authResponseSchema,
  changePasswordResponseSchema,
  forgotPasswordResponseSchema,
  resetPasswordResponseSchema,
} from '../model/api'
import { userSchema } from '../model/user'

export const userService = {
  registration: async (registrationUserDTO: RegistrationUserDTO) => {
    const { data } = await api.post<unknown>(API_PATHS.user.registration, registrationUserDTO)
    const validatedData = authResponseSchema.parse(data)
    return validatedData
  },

  login: async (authUserDTO: AuthUserDTO) => {
    const { data } = await api.post<unknown>(API_PATHS.user.login, authUserDTO)
    const validatedData = authResponseSchema.parse(data)
    return validatedData
  },

  logout: async (): Promise<void> => api.get(API_PATHS.user.logout),

  getProfile: async () => {
    const { data } = await api.get<unknown>(API_PATHS.user.getProfile)
    const validatedData = userSchema.parse(data)
    return validatedData
  },

  updateProfile: async (id: string, updateProfileDTO: UpdateProfileDTO) => {
    const { data } = await api.patch<unknown>(API_PATHS.user.updateProfile, updateProfileDTO)
    const validatedData = userSchema.parse(data)
    return validatedData
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post<unknown>(API_PATHS.user.forgotPassword, { email })
    const validatedData = forgotPasswordResponseSchema.parse(data)
    return validatedData
  },

  resetPassword: async (forgotPasswordLink: string, password: string) => {
    const { data } = await api.post<unknown>(API_PATHS.user.resetPassword, {
      link: forgotPasswordLink,
      password,
    })
    const validatedData = resetPasswordResponseSchema.parse(data)
    return validatedData
  },

  changePassword: async (password: string) => {
    const { data } = await api.post<unknown>(API_PATHS.user.changePassword, { password })
    const validatedData = changePasswordResponseSchema.parse(data)
    return validatedData
  },
}
