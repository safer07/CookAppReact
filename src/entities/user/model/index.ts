import { z } from 'zod'

export const emailSchema = z.string({ required_error: 'Введите email' }).email('Неверный email')
export const passwordSchema = z
  .string({ required_error: 'Введите пароль' })
  .min(5, 'Пароль должен состоять минимум из 5 символов')

export const accessTokenSchema = z.string().jwt()

export const userSchema = z.object({
  _id: z.string(),
  email: emailSchema,
  name: z.string().optional(),
  lastName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  gender: z.string().optional(),
  // В БД ISO '2012-01-26T13:51:50.417-07:00', а в форме '2012-01-26' (z.string().datetime() vs z.string().date())
  birthDate: z.string().datetime().nullish(),
  favorites: z.object({ recipes: z.array(z.string()) }),
})

export type User = {
  _id: string
  email: string
  name?: string
  lastName?: string
  avatarUrl?: string
  gender?: string
  birthDate?: string | null
}
