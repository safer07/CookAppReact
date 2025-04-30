import { emailSchema, userService } from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import { CustomError } from '@/shared/model'

export type FormState = {
  email?: string
  error?: CustomError | null
  success?: boolean
}

export async function onSubmit(prevState: FormState, formData: FormData) {
  const email = (formData.get('email') as string | null) ?? ''
  const result = emailSchema.safeParse(email)

  if (result.success) {
    try {
      await userService.forgotPassword(result.data)
      return { email: '', success: true }
    } catch (error) {
      return { email, error: catchHttpError(error) }
    }
  } else {
    return { email, error: { errors: formatZodError(result) } }
  }
}
