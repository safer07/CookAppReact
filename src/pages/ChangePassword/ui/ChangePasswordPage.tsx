import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import {
  afterLogin,
  changePasswordFormDataSchema,
  resetPasswordLinkSchema,
  userService,
} from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError, HttpStatus } from '@/shared/model'
import { CHANGE_PASSWORD_ROUTE, SETTINGS_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

export default function ResetPasswordPage(): React.JSX.Element {
  const location = useLocation()
  const { link } = useParams<{ link: string }>()
  const navigate = useNavigate()
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)
  const isReset = location.pathname !== CHANGE_PASSWORD_ROUTE

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

    try {
      if (isReset) {
        const linkResult = resetPasswordLinkSchema.safeParse(link)
        if (!linkResult.success) {
          setError({
            errors: formatZodError(linkResult),
          })
          return
        }
        setStatus('loading')
        const response = await userService.resetPassword(linkResult.data, result.data.password)
        afterLogin(response)
      } else {
        setStatus('loading')
        await userService.changePassword(result.data.password)
      }
      setStatus('success')
      toast.success('Пароль изменён')
      navigate(SETTINGS_ROUTE, { replace: true })
    } catch (error) {
      setStatus('error')
      catchHttpError(error, setError)
    }
  }

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
