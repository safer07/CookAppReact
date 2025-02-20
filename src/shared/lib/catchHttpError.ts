import { isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { HttpErrorResponse, ZodErrorResponse } from '../model/httpError'
import { CustomError } from '../model/customError'

export function catchHttpError(
  error: unknown,
  setError: (value: React.SetStateAction<CustomError>) => CustomError | void = () => {},
) {
  console.error(error)

  // TODO: возможно ли это переписать?
  // if (error instanceof AxiosError) {const data = error.response?.data}
  if (isAxiosError<HttpErrorResponse | ZodErrorResponse>(error)) {
    const data = error.response?.data
    if (data) {
      setError(data)
      return data
    } else {
      const errorData =
        error.code === 'ERR_NETWORK'
          ? { message: 'Ошибка подключения к серверу' }
          : { message: error.message }

      setError(errorData)
      return errorData
    }
  }

  if (error instanceof ZodError) {
    const errorData = {
      message: 'Ошибка валидации входящих данных от сервера',
      errors: error.errors.map((issue) => ({
        message: `${issue.path.join('.')}: ${issue.message}`,
      })),
    }
    setError(errorData)
    return errorData
  }

  return null
}
