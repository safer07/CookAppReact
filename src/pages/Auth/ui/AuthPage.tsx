import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import PrivacyAccepting from './PrivacyAccepting'
import TopAppBar from '@/widgets/TopAppBar'
import {
  LoginFormData,
  loginFormDataSchema,
  RegistrationFormData,
  registrationFormDataSchema,
} from '@/entities/user/model/api'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import catchHttpError from '@/shared/utils/catchHttpError'
import formatZodError from '@/shared/utils/formatZodError'
import { CustomError } from '@/shared/model/customError'
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'

const emptyLoginFormData: LoginFormData = { email: '', password: '' }
const emptyRegistrationFormData: RegistrationFormData = {
  ...emptyLoginFormData,
  passwordRepeat: '',
}

export default function LoginPage(): JSX.Element {
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

  useEffect(() => {
    // TODO: Возвращать откуда пришёл, но navigate(-1) запирает при прямом логине, а другие решения не работали. нужно учитывать ссылки снизу и забыли пароль
    // if (user) navigate(-1)
    if (user) navigate(MAIN_ROUTE, { replace: true })
  }, [user])

  useEffect(() => {
    setFormData(emptyFormData)
  }, [location])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const result = isLogin
      ? loginFormDataSchema.safeParse(formData)
      : registrationFormDataSchema.safeParse(formData)
    if (result.success) {
      try {
        isLogin ? await login(result.data) : await registration(result.data)
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
            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
            type="email"
            label="Email"
          />
          <div className="flex flex-col gap-1">
            <Input
              value={formData.password}
              onChange={(value) => setFormData((prev) => ({ ...prev, password: value }))}
              type="password"
              label="Пароль"
            />
            <Link
              to={FORGOT_PASSWORD_ROUTE}
              className="self-end font-bold text-primary hover-hover:hover:text-primary-active"
            >
              Забыли пароль?
            </Link>
          </div>
          {!isLogin && (
            <Input
              value={formData.passwordRepeat}
              onChange={(value) => setFormData((prev) => ({ ...prev, passwordRepeat: value }))}
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
          className="font-bold text-primary hover-hover:hover:text-primary-active"
        >
          {isLogin ? 'Регистрация' : 'Вход'}
        </Link>
      </div>
    </>
  )
}
