import { isAxiosError } from 'axios'
import { ZodError } from 'zod'

import { HttpErrorResponse, ZodErrorResponse } from '../model/httpError'
import { CustomError } from '../model/customError'

export default function catchHttpError(
  error: unknown,
  setError: (value: React.SetStateAction<CustomError>) => void,
) {
  console.error(error)

  // TODO: возможно ли это переписать?
  // if (error instanceof AxiosError) {const data = error.response?.data}
  if (isAxiosError<HttpErrorResponse | ZodErrorResponse>(error)) {
    const data = error.response?.data
    if (data) setError(data)
    else {
      if (error.code === 'ERR_NETWORK') setError({ message: 'Ошибка подключения к серверу' })
      else setError({ message: error.message })
    }
  }

  if (error instanceof ZodError) {
    setError({
      message: 'Ошибка валидации входящих данных от сервера',
      errors: error.errors.map((issue) => ({
        message: `${issue.path.join('.')}: ${issue.message}`,
      })),
    })
  }
}
