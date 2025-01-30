import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import userService from '@/entities/user/api'
import { emailSchema } from '@/entities/user/model'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import catchHttpError from '@/shared/utils/catchHttpError'
import formatZodError from '@/shared/utils/formatZodError'
import { CustomError } from '@/shared/model/customError'
import { PROFILE_ROUTE } from '@/shared/routes'

type Status = 'init' | 'loading' | 'error' | 'success'

export default function ForgotPasswordPage(): JSX.Element {
  const navigate = useNavigate()
  const { user } = useUser()
  const [email, setEmail] = useState<string>('')
  const [status, setStatus] = useState<Status>('init')
  const [error, setError] = useState<CustomError>(null)

  useEffect(() => {
    if (user) navigate(PROFILE_ROUTE, { replace: true })
  }, [user])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const result = emailSchema.safeParse(email)

    if (result.success) {
      try {
        setStatus('loading')
        await userService.forgotPassword(result.data)
        setStatus('success')
        setEmail('')
      } catch (error) {
        setStatus('error')
        catchHttpError(error, setError)
      }
    } else {
      setStatus('error')
      setError({
        errors: formatZodError(result),
      })
    }
  }

  return (
    <>
      <TopAppBar title="Забыли пароль" back />
      <form className="mt-2 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input value={email} onChange={(value) => setEmail(value)} type="email" label="Email" />
          <ErrorComponent error={error} />
          {status === 'success' && (
            <p className="text-system-positive">
              Ссылка на смену пароля отправлена на указанный email
            </p>
          )}
        </div>

        <Button
          variant="primary"
          text="Получить ссылку"
          fullWidth
          type="submit"
          disabled={status === 'loading'}
          loading={status === 'loading'}
        />
      </form>
    </>
  )
}
