import { z } from 'zod'

// -----
// -----
// ----- Response -----
// -----
// -----
export const dashboardResponseSchema = z.object({
  users: z.object({ all: z.number(), week: z.number() }),
  recipes: z.object({ all: z.number(), week: z.number(), onModeration: z.number() }),
})
export type DashboardData = z.infer<typeof dashboardResponseSchema>
