import { isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { CustomError } from '../model/customError'
import { HttpErrorResponse, ZodErrorResponse } from '../model/httpError'

export function catchHttpError(
  error: unknown,
  setError?: (value: React.SetStateAction<CustomError>) => CustomError | void,
) {
  console.error(error)

  // TODO: возможно ли это переписать?
  // if (error instanceof AxiosError) {const data = error.response?.data}
  if (isAxiosError<HttpErrorResponse | ZodErrorResponse>(error)) {
    const data = error.response?.data
    if (data) {
      if (setError) setError(data)
      return data
    } else {
      const errorData =
        error.code === 'ERR_NETWORK'
          ? { message: 'Ошибка подключения к серверу' }
          : { message: error.message }

      if (setError) setError(errorData)
      return errorData
    }
  }

  if (error instanceof ZodError) {
    const errorData = {
      message: 'Ошибка валидации входящих данных от сервера',
      errors: error.errors.map(issue => ({
        message: `${issue.path.join('.')}: ${issue.message}`,
      })),
    }
    if (setError) setError(errorData)
    return errorData
  }

  return null
}
