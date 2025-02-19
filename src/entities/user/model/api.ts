import { z } from 'zod'

import { emailSchema, passwordSchema, userSchema } from './user'
import { accessTokenSchema } from '@/shared/model'

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
export type LoginFormData = z.infer<typeof loginFormDataSchema>

export const registrationFormDataSchema = loginFormDataSchema
  .extend({
    passwordRepeat: passwordSchema,
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })
export type RegistrationFormData = z.infer<typeof registrationFormDataSchema>

export const updateProfileDTOSchema = z
  .object({
    name: z.string(),
    lastName: z.string(),
    email: emailSchema,
    // avatarUrl: z.string().url(),
    gender: z.string(),
    birthDate: z.union([z.string().date(), z.literal('')]),
  })
  .partial()
export type UpdateProfileDTO = z.infer<typeof updateProfileDTOSchema>

export const resetPasswordLinkSchema = z
  .string({ required_error: 'Не указана ссылка на сброс пароля' })
  .uuid('Неверный формат ссылки на сброс пароля')

export const changePasswordFormDataSchema = z
  .object({
    password: passwordSchema,
    passwordRepeat: passwordSchema,
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })
export type ChangePasswordFormData = z.infer<typeof changePasswordFormDataSchema>

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

export const resetPasswordResponseSchema = authResponseSchema
export type resetPasswordResponse = AuthResponse

export const changePasswordResponseSchema = z.object({
  message: z.string(),
})
export type ChangePasswordResponse = z.infer<typeof changePasswordResponseSchema>
