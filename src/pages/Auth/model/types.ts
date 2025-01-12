import { z } from 'zod'

export const LoginFormDataSchema = z.object({ email: z.string().email(), password: z.string() })
export type LoginFormDataType = z.infer<typeof LoginFormDataSchema>

export const RegistrationFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  passwordRepeat: z.string(),
})
export type RegistrationFormDataType = z.infer<typeof RegistrationFormDataSchema>

export const authResponseSchema = z.object({
  message: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
})
export type AuthResponse = z.infer<typeof authResponseSchema>

export type AuthErrorResponse = {
  message: string
}

export type ValidationError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}
