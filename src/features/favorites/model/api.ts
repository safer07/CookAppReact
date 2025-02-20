import { z } from 'zod'

// -----
// -----
// ----- Response -----
// -----
// -----
export const addRecipeResponseSchema = z.array(z.string())

export const removeRecipeResponseSchema = z.array(z.string())
