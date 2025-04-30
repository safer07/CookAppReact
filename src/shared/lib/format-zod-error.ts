import { SafeParseError } from 'zod'

export function formatZodError(result: SafeParseError<unknown>) {
  return result.error.errors.map(issue => ({ message: issue.message }))
}
