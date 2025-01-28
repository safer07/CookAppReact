import { authResponseSchema, AuthUserDTO, UpdateProfileDTO, userSchema } from '../model/api'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

const userService = {
  registration: async (authUserDTO: AuthUserDTO) => {
    const { data } = await api.post<unknown>(API_PATHS.user.registration, authUserDTO)
    const validatedData = authResponseSchema.parse(data)
    return validatedData
  },

  login: async (authUserDTO: AuthUserDTO) => {
    const { data } = await api.post<unknown>(API_PATHS.user.login, authUserDTO)
    const validatedData = authResponseSchema.parse(data)
    return validatedData
  },

  logout: async (): Promise<void> => {
    return api.get(API_PATHS.user.logout)
  },

  getProfile: async () => {
    const { data } = await api.get<unknown>(API_PATHS.user.getProfile)
    const validatedData = userSchema.parse(data)
    return validatedData
  },

  updateProfile: async (id: string, updateProfileDTO: UpdateProfileDTO) => {
    const { data } = await api.patch<unknown>(
      `${API_PATHS.user.updateProfile}/${id}`,
      updateProfileDTO,
    )
    const validatedData = userSchema.parse(data)
    return validatedData
  },
}

// export async function checkAuth() {
//   this.setLoading(true)
//   // Отдельный axios, чтобы не использовать кастомный, чтобы не срабатывал interceptor на 401
//   try {
//     const response = await axios.get<AuthResponse>(`${BACKEND_URL}/refresh`, {
//       withCredentials: true,
//     })
//     console.log(response)
//     localStorage.setItem('token', response.data.accessToken)
//     this.setAuth(true)
//     this.setUser(response.data.user)
//   } catch (error) {
//     console.log(error.response?.data?.message)
//   } finally {
//     this.setLoading(false)
//   }
// }

export default userService
