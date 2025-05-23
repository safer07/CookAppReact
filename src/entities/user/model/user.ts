import { z } from 'zod'

export const emailSchema = z
  .string({ required_error: 'Введите email' })
  .trim()
  .email('Неверный email')
  .max(32, { message: 'Email слишком длинный' })
  .toLowerCase()
export const passwordSchema = z
  .string({ required_error: 'Введите пароль' })
  .trim()
  .min(5, 'Пароль должен состоять минимум из 5 символов')

export const userSchema = z.object({
  id: z.string(),
  email: emailSchema,
  name: z.string().trim().max(32, { message: 'Имя слишком длинное' }).nullable(),
  lastName: z.string().trim().max(32, { message: 'Фамилия слишком длинная' }).nullable(),
  avatarUrl: z.string().url().nullable(),
  gender: z.string().nullable(),
  birthDate: z.string().date().nullable(),
  role: z.enum(['admin', 'moderator', 'user']),
})
export type User = z.infer<typeof userSchema>
