import { z } from 'zod'

export const LoginFormDataSchema = z.object({ email: z.string().email(), password: z.string() })
export type LoginFormDataType = z.infer<typeof LoginFormDataSchema>

export const RegistrationFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  passwordRepeat: z.string(),
})
export type RegistrationFormDataType = z.infer<typeof RegistrationFormDataSchema>

export const AuthUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type AuthUserDtoType = z.infer<typeof AuthUserDto>

export const AuthResponseSchema = z.object({
  message: z.string(),
  accessToken: z.string().jwt(),
  refreshToken: z.string().jwt(),
  // TODO: тип есть IUser, но изначально он не zod, посмотреть примеры
  user: z.any(),
})
export type AuthResponse = z.infer<typeof AuthResponseSchema>

// TODO: убрать, когда со страницы Auth будет убрана зависимость. Все error имеют одинаковый формат
export type AuthErrorResponse = {
  message: string
}

// export const getUser = z.object({
//   message: z.string(),
//   accessToken: z.string().jwt(),
//   refreshToken: z.string().jwt(),
// })
// export type AuthResponse = z.infer<typeof AuthResponseSchema>

export const UpdateProfileDto = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  gender: z.string(),
  birthDate: z.string(),
  // birthDate: z.date(),
})
export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>

// TODO: Ошибки теперь имеют тип zod, а не express-validator (создать тип ошибки в shared/model)
export type ValidationError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}
