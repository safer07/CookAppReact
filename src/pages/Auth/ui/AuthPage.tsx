import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import {
  type LoginFormData,
  type RegistrationFormData,
  loginFormDataSchema,
  registrationFormDataSchema,
  useUser,
} from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError, LocationState } from '@/shared/model'
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

import PrivacyAccepting from './PrivacyAccepting'

const emptyLoginFormData: LoginFormData = { email: '', password: '' }
const emptyRegistrationFormData: RegistrationFormData = {
  ...emptyLoginFormData,
  passwordRepeat: '',
}

export default function LoginPage(): React.JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, status, login, registration } = useUser()
  const emptyFormData =
    location.pathname === LOGIN_ROUTE ? emptyLoginFormData : emptyRegistrationFormData
  const [formData, setFormData] = useState<LoginFormData | RegistrationFormData>(emptyFormData)
  const [error, setError] = useState<CustomError>(null)
  const isRegistration = ((
    formData: LoginFormData | RegistrationFormData,
  ): formData is RegistrationFormData => 'passwordRepeat' in formData)(formData)
  const isLogin = !isRegistration
  const { from } = (location.state as LocationState) ?? { from: { pathname: MAIN_ROUTE } }

  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [user, from, navigate])

  useEffect(() => {
    setFormData(emptyFormData)
  }, [location, emptyFormData])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const result = isLogin
      ? loginFormDataSchema.safeParse(formData)
      : registrationFormDataSchema.safeParse(formData)
    if (result.success) {
      try {
        if (isLogin) await login(result.data)
        else await registration(result.data)
      } catch (error) {
        catchHttpError(error, setError)
      }
    } else {
      setError({
        errors: formatZodError(result),
      })
    }
  }

  return (
    <>
      <TopAppBar title={isLogin ? 'Вход' : 'Регистрация'} back />
      <form className="mt-2 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input
            value={formData.email}
            onChange={value => setFormData(prev => ({ ...prev, email: value }))}
            type="email"
            label="Email"
          />
          <div className="flex flex-col gap-1">
            <Input
              value={formData.password}
              onChange={value => setFormData(prev => ({ ...prev, password: value }))}
              type="password"
              label="Пароль"
            />
            {isLogin && (
              <Link
                to={FORGOT_PASSWORD_ROUTE}
                className="text-primary hover:text-primary-active self-end font-bold"
              >
                Забыли пароль?
              </Link>
            )}
          </div>
          {!isLogin && (
            <Input
              value={formData.passwordRepeat}
              onChange={value => setFormData(prev => ({ ...prev, passwordRepeat: value }))}
              type="password"
              label="Повторите пароль"
            />
          )}
          <ErrorComponent error={error} />
        </div>

        {!isLogin && <PrivacyAccepting />}

        <Button
          variant="primary"
          text={isLogin ? 'Войти' : 'Зарегистрироваться'}
          fullWidth
          type="submit"
          disabled={status === 'loading'}
          loading={status === 'loading'}
        />
      </form>
      <div className="py-2 text-center">
        <span>{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'} </span>
        <Link
          to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
          className="text-primary hover:text-primary-active font-bold"
          state={{ from }}
        >
          {isLogin ? 'Регистрация' : 'Вход'}
        </Link>
      </div>
    </>
  )
}
