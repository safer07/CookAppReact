import { IUser } from '../model'
import { AuthResponse, AuthResponseSchema, AuthUserDTO, UpdateProfileDTO } from '../model/api'
import api from '@/shared/api'
import { API_PATHS } from '@/shared/config'

const userService = {
  registration: async (AuthUserDTO: AuthUserDTO) => {
    const { data } = await api.post<AuthResponse>(API_PATHS.user.registration, AuthUserDTO)
    const validatedData = AuthResponseSchema.parse(data)
    return validatedData
  },

  login: async (AuthUserDTO: AuthUserDTO) => {
    const { data } = await api.post<AuthResponse>(API_PATHS.user.login, AuthUserDTO)
    const validatedData = AuthResponseSchema.parse(data)
    return validatedData

    // TODO: как валидировать?
    // const validatedData = AuthResponseSchema.safeParse(data)
    // console.log(validatedData)
    // if (!validatedData.success) return console.error(validatedData.error)
    // else return data
  },

  logout: async (): Promise<void> => {
    return api.get(API_PATHS.user.logout)
  },

  getProfile: async () => {
    const { data } = await api.get<IUser>(API_PATHS.user.getProfile)
    // TODO: валидация user
    // const validatedData = AuthResponseSchema.parse(data)
    return data
  },

  updateProfile: async (id: string, UpdateProfileDTO: UpdateProfileDTO) => {
    const { data } = await api.patch<IUser>(
      `${API_PATHS.user.updateProfile}/${id}`,
      UpdateProfileDTO,
    )
    // TODO: валидация user
    // const validatedData = AuthResponseSchema.parse(data)
    return data
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
