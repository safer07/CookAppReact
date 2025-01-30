import { SafeParseError } from 'zod'

export default function formatZodError(result: SafeParseError<any>) {
  return result.error.errors.map((issue) => ({ message: issue.message }))
}
