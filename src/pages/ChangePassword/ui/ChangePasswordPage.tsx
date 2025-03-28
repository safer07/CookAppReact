import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import {
  type ChangePasswordFormData,
  changePasswordFormDataSchema,
  resetPasswordLinkSchema,
  useUser,
} from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import { CHANGE_PASSWORD_ROUTE, PROFILE_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

const emptyFormData: ChangePasswordFormData = { password: '', passwordRepeat: '' }

export default function ResetPasswordPage(): React.JSX.Element {
  const location = useLocation()
  const { link } = useParams<{ link: string }>()
  const navigate = useNavigate()
  const { user, status, setStatus, resetPassword, changePassword } = useUser()
  const [formData, setFormData] = useState<ChangePasswordFormData>(emptyFormData)
  const [error, setError] = useState<CustomError>(null)
  const isReset = location.pathname !== CHANGE_PASSWORD_ROUTE

  useEffect(() => {
    if (user && link) navigate(PROFILE_ROUTE, { replace: true })

    if (isReset) {
      const result = resetPasswordLinkSchema.safeParse(link)
      if (!result.success) {
        setError({
          errors: formatZodError(result),
        })
      }
    }
  }, [user, link, navigate, isReset])

  useEffect(() => {
    setStatus('init')
  }, [setStatus])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const result = changePasswordFormDataSchema.safeParse(formData)

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
        await resetPassword(linkResult.data, result.data.password)
      } else await changePassword(result.data.password)
      setFormData(emptyFormData)
    } catch (error) {
      catchHttpError(error, setError)
    }
  }

  return (
    <>
      <TopAppBar title="Смена пароля" back />
      <form className="mt-2 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input
            value={formData.password}
            onChange={value => setFormData(prev => ({ ...prev, password: value }))}
            type="password"
            label="Пароль"
          />
          <Input
            value={formData.passwordRepeat}
            onChange={value => setFormData(prev => ({ ...prev, passwordRepeat: value }))}
            type="password"
            label="Повторите пароль"
          />
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
