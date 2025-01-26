import { z } from 'zod'

const emailSchema = z.string({ required_error: 'Введите email' }).email('Неверный email')
const passwordSchema = z
  .string({ required_error: 'Введите пароль' })
  .min(5, 'Пароль должен состоять минимум из 5 символов')

const accessTokenSchema = z.string().jwt()

export const userSchema = z.object({
  _id: z.string(),
  email: emailSchema,
  name: z.string().optional(),
  lastName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  gender: z.string().optional(),
  // В БД ISO '2012-01-26T13:51:50.417-07:00', а в форме '2012-01-26' (z.string().datetime() vs z.string().date())
  birthDate: z.string().datetime().nullable(),
})
export type UserResponse = z.infer<typeof userSchema>

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
  accessToken: accessTokenSchema,
  user: userSchema,
})
export type AuthResponse = z.infer<typeof authResponseSchema>

export const refreshResponseSchema = z.object({
  message: z.string(),
  accessToken: accessTokenSchema,
})
export type RefreshResponse = z.infer<typeof refreshResponseSchema>

export const updateProfileDTOSchema = z
  .object({
    name: z.string(),
    lastName: z.string(),
    email: emailSchema,
    // avatarUrl: z.string().url(),
    // password: passwordSchema,
    gender: z.string(),
    birthDate: z.union([z.string().date(), z.literal('')]),
  })
  .partial()
  .strict()
export type UpdateProfileDTO = z.infer<typeof updateProfileDTOSchema>
