import axios from 'axios'

import { afterLogout } from '@/entities/user'

import { ACCESS_TOKEN_KEY, API_PATHS, BACKEND_URL } from '../config'
import { refreshResponseSchema } from './model'

// TODO: не импортировать из entities

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
    const status = error.response?.status ?? null

    if (status === 401 || status === 403) {
      if (!originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
          const { data } = await axios.get<unknown>(`${BACKEND_URL}${API_PATHS.user.refresh}`, {
            withCredentials: true,
          })
          const validatedData = refreshResponseSchema.parse(data)
          localStorage.setItem(ACCESS_TOKEN_KEY, validatedData.accessToken)
        } catch {
          if (status === 401) console.error('Пользователь не авторизован')
          if (status === 403) console.error('Нет доступа')
        }
        return api.request(originalRequest)
      } else {
        if (status === 401) afterLogout()
      }
    }

    return Promise.reject(error)
  },
)

export default api
