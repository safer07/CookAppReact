import axios from 'axios'

import { AuthResponse } from '@/entities/user/model/api'
import { ACCESS_TOKEN_KEY, API_PATHS, BACKEND_URL } from '../config'

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
})

// Авторизация в исходящем запросе
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
  return config
})

// Использовать refreshToken однократно при получении статуса 401
api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthResponse>(`${BACKEND_URL}${API_PATHS.user.refresh}`, {
          withCredentials: true,
        })
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken)
        return api.request(originalRequest)
      } catch (error) {
        console.error('Пользователь не авторизован')
      }
    }

    throw error
  },
)

export default api
