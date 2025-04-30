import { z } from 'zod'

export const recipeCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  fullName: z.string(),
  img: z.string(),
})
export type RecipeCategory = z.infer<typeof recipeCategorySchema>
