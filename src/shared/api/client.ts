import axios from 'axios'

import { ACCESS_TOKEN_KEY, API_PATHS, BACKEND_URL } from '../config'
import { refreshResponseSchema } from './model'

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=UTF-8' },
  withCredentials: true,
})

// Авторизация в исходящем запросе
api.interceptors.request.use(request => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`
  return request
})

// Использовать refreshToken однократно при получении статуса 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { data } = await axios.get<unknown>(`${BACKEND_URL}${API_PATHS.user.refresh}`, {
          withCredentials: true,
        })
        const validatedData = refreshResponseSchema.parse(data)
        localStorage.setItem(ACCESS_TOKEN_KEY, validatedData.accessToken)
        return api.request(originalRequest)
      } catch {
        console.error('Пользователь не авторизован')
      }
    } else throw error
  },
)

export default api
