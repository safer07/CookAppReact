import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/top-app-bar'

import {
  afterLogin,
  changePasswordFormDataSchema,
  resetPasswordLinkSchema,
  userService,
} from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import { CHANGE_PASSWORD_ROUTE, SETTINGS_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/button'
import ErrorComponent from '@/shared/ui/error-component'
import Input from '@/shared/ui/input'

const toastParams = {
  loading: 'Загрузка...',
  success: 'Пароль изменён',
  error: 'Не удалось изменить пароль',
}

export default function ResetPasswordPage(): React.JSX.Element {
  const location = useLocation()
  const { link } = useParams<{ link: string }>()
  const navigate = useNavigate()
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)
  const isReset = location.pathname !== CHANGE_PASSWORD_ROUTE

  function afterSuccess() {
    setStatus('success')
    navigate(SETTINGS_ROUTE, { replace: true })
  }

  function afterError(error: unknown) {
    setStatus('error')
    catchHttpError(error, setError)
    throw new Error()
  }

  async function onSubmit(formData: FormData) {
    setError(null)

    const data = {
      password: formData.get('password'),
      passwordRepeat: formData.get('passwordRepeat'),
    }
    const result = changePasswordFormDataSchema.safeParse(data)

    if (!result.success) {
      setError({
        errors: formatZodError(result),
      })
      return
    }

    if (isReset) {
      const linkResult = resetPasswordLinkSchema.safeParse(link)
      if (!linkResult.success) {
        setError({
          errors: formatZodError(linkResult),
        })
        return
      }

      setStatus('loading')
      toast.promise(async () => {
        try {
          const response = await userService.resetPassword(linkResult.data, result.data.password)
          afterLogin(response)
          afterSuccess()
        } catch (error) {
          afterError(error)
        }
      }, toastParams)
    } else {
      setStatus('loading')
      toast.promise(async () => {
        try {
          await userService.changePassword(result.data.password)
          afterSuccess()
        } catch (error) {
          afterError(error)
        }
      }, toastParams)
    }
  }

  useEffect(() => {
    if (isReset) {
      const result = resetPasswordLinkSchema.safeParse(link)
      if (!result.success) {
        setError({
          errors: formatZodError(result),
        })
      }
    }
  }, [link, isReset])

  return (
    <>
      <TopAppBar title="Смена пароля" back />
      <form className="mt-2 space-y-3" action={onSubmit}>
        <div className="space-y-2">
          <Input type="password" label="Пароль" name="password" />
          <Input type="password" label="Повторите пароль" name="passwordRepeat" />
          <ErrorComponent error={error} />
        </div>

        <Button
          variant="primary"
          text="Сменить пароль"
          fullWidth
          type="submit"
          disabled={status === 'loading'}
          loading={status === 'loading'}
        />
      </form>
    </>
  )
}
