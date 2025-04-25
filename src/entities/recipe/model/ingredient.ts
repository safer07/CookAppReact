import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z.string(),
  units: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
})
export type Ingredient = z.infer<typeof ingredientSchema>
