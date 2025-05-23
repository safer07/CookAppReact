import { z } from 'zod'

// -----
// -----
// ----- Request & DTO -----
// -----
// -----
export const recipeModerationSchema = z.object({
  status: z.enum(['approved', 'rejected', 'pending'], { message: 'Выберите статус' }),
  moderationMessage: z.string().trim(),
})
export type RecipeModerationDTO = z.infer<typeof recipeModerationSchema>

// -----
// -----
// ----- Response -----
// -----
// -----
export const recipeModerationResponseSchema = z.object({
  message: z.string(),
})
