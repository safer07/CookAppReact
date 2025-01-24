import { z } from 'zod'

const emailSchema = z.string({ required_error: 'Введите email' }).email('Неверный email')
const passwordSchema = z
  .string({ required_error: 'Введите пароль' })
  .min(5, 'Пароль должен состоять минимум из 5 символов')

export const authUserDTOSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export type AuthUserDTO = z.infer<typeof authUserDTOSchema>

export const loginFormDataSchema = authUserDTOSchema
export type LoginFormData = z.infer<typeof loginFormDataSchema>

export const registrationFormDataSchema = z
  .intersection(
    loginFormDataSchema,
    z.object({
      passwordRepeat: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })
export type RegistrationFormData = z.infer<typeof registrationFormDataSchema>

export const authResponseSchema = z.object({
  message: z.string(),
  accessToken: z.string().jwt(),
  // TODO: тип есть IUser, но изначально он не zod, посмотреть примеры
  user: z.any(),
})
export type AuthResponse = z.infer<typeof authResponseSchema>

// export const getUser = z.object({
//   message: z.string(),
//   accessToken: z.string().jwt(),
// })
// export type AuthResponse = z.infer<typeof AuthResponseSchema>

export const updateProfileDTOSchema = z
  .object({
    name: z.string(),
    lastName: z.string(),
    email: emailSchema,
    avatarUrl: z.string().url(),
    password: passwordSchema,
    gender: z.string(),
    birthDate: z.string().datetime(),
  })
  .partial()
  .strict()
export type UpdateProfileDTO = z.infer<typeof updateProfileDTOSchema>
