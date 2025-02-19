import { SafeParseError } from 'zod'

export function formatZodError(result: SafeParseError<any>) {
  return result.error.errors.map((issue) => ({ message: issue.message }))
}
