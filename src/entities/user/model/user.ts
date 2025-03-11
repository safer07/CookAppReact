import { z } from 'zod'

export const emailSchema = z.string({ required_error: 'Введите email' }).email('Неверный email')
export const passwordSchema = z
  .string({ required_error: 'Введите пароль' })
  .min(5, 'Пароль должен состоять минимум из 5 символов')

export const userSchema = z.object({
  id: z.string(),
  email: emailSchema,
  name: z.string().nullable(),
  lastName: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  gender: z.string().nullable(),
  birthDate: z.string().date().nullable(),
})
export type User = z.infer<typeof userSchema>
