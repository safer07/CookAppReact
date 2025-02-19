import { z } from 'zod'

import { accessTokenSchema } from '../model'

export const refreshResponseSchema = z.object({
  message: z.string(),
  accessToken: accessTokenSchema,
})
