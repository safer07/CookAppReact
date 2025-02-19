import { z } from 'zod'

export const accessTokenSchema = z.string().jwt()
