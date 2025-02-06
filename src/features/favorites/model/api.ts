import { z } from 'zod'

// -----
// -----
// ----- Response -----
// -----
// -----
export const addRecipeResponseSchema = z.array(z.string())
export type AddRecipeResponse = z.infer<typeof addRecipeResponseSchema>

export const removeRecipeResponseSchema = z.array(z.string())
export type RemoveRecipeResponse = z.infer<typeof removeRecipeResponseSchema>
