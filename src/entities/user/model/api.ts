import { z } from 'zod'

import { accessTokenSchema } from '@/shared/model'

import { emailSchema, passwordSchema, userSchema } from './user'

// -----
// -----
// ----- Request & DTO -----
// -----
// -----
export const authUserDTOSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export type AuthUserDTO = z.infer<typeof authUserDTOSchema>

export const registrationUserDTOSchema = authUserDTOSchema.extend({
  favorites: z
    .object({
      recipes: z.array(z.string()),
    })
    .optional(),
})
export type RegistrationUserDTO = z.infer<typeof registrationUserDTOSchema>

export const loginFormDataSchema = authUserDTOSchema

export const registrationFormDataSchema = loginFormDataSchema
  .extend({
    passwordRepeat: passwordSchema,
  })
  .refine(data => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })

const updateProfileFormDataSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: emailSchema,
  // avatarUrl: z.string().url(),
  gender: z.string(),
  birthDate: z.union([z.string().date(), z.literal('')]),
})
export type UpdateProfileFormData = z.infer<typeof updateProfileFormDataSchema>

export const updateProfileDTOSchema = updateProfileFormDataSchema
  .omit({ gender: true, birthDate: true })
  .extend({
    gender: z.enum(['male', 'female']).or(z.null()),
    birthDate: z.string().date().or(z.null()),
  })
export type UpdateProfileDTO = z.infer<typeof updateProfileDTOSchema>

export const resetPasswordLinkSchema = z
  .string({ required_error: 'Не указана ссылка на сброс пароля' })
  .uuid('Неверный формат ссылки на сброс пароля')

export const changePasswordFormDataSchema = z
  .object({
    password: passwordSchema,
    passwordRepeat: passwordSchema,
  })
  .refine(data => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })

// -----
// -----
// ----- Response -----
// -----
// -----
export const authResponseSchema = z.object({
  message: z.string(),
  accessToken: accessTokenSchema,
  user: userSchema,
})
export type AuthResponse = z.infer<typeof authResponseSchema>

export type UserResponse = z.infer<typeof userSchema>

export const forgotPasswordResponseSchema = z.object({
  message: z.string(),
})
export type ForgotPasswordResponse = z.infer<typeof forgotPasswordResponseSchema>

export const changePasswordResponseSchema = z.object({
  message: z.string(),
})
export type ChangePasswordResponse = z.infer<typeof changePasswordResponseSchema>
