import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { ZodError } from 'zod'

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
import { CustomError } from '@/shared/model/customError'
import { LOGIN_ROUTE, RECIPES_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'
import { HttpErrorResponse, ZodErrorResponse } from '@/shared/model/httpError'

const emptyLoginForm: LoginFormData = { email: '', password: '' }
const emptyRegistrationForm: RegistrationFormData = {
  ...emptyLoginForm,
  passwordRepeat: '',
}

export default function LoginPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, status, login, registration } = useUser()
  const emptyFormData = location.pathname === LOGIN_ROUTE ? emptyLoginForm : emptyRegistrationForm
  const [formData, setFormData] = useState<LoginFormData | RegistrationFormData>(emptyFormData)
  const [error, setError] = useState<CustomError>(null)
  const isRegistration = ((
    formData: LoginFormData | RegistrationFormData,
  ): formData is RegistrationFormData => 'passwordRepeat' in formData)(formData)
  const isLogin = !isRegistration

  useEffect(() => {
    // TODO: Возвращать откуда пришёл, но navigate(-1) запирает при прямом логине, а другие решения не работали. нужно учитывать ссылки снизу и забыли пароль
    // if (user) navigate(-1)
    if (user) navigate(RECIPES_ROUTE, { replace: true })
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
    if (!result.success) {
      setError({
        errors: result.error.errors.map((issue) => ({ message: issue.message })),
      })
      return
    }

    try {
      isLogin ? await login(result.data) : await registration(result.data)
    } catch (error) {
      console.error(error)
      // TODO: возможно ли это переписать?
      // if (error instanceof AxiosError) {const data = error.response?.data}
      if (isAxiosError<HttpErrorResponse | ZodErrorResponse>(error)) {
        const data = error.response?.data
        if (data) {
          setError(data)
        } else {
          setError({ message: error.message })
        }
      }

      if (error instanceof ZodError) {
        setError({
          message: 'Ошибка валидации входящих данных от сервера',
          errors: error.errors.map((issue) => ({
            message: `${issue.path.join('.')}: ${issue.message}`,
          })),
        })
      }
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
          <Input
            value={formData.password}
            onChange={(value) => setFormData((prev) => ({ ...prev, password: value }))}
            type="password"
            label="Пароль"
          />
          {!isLogin && (
            <Input
              value={formData.passwordRepeat}
              onChange={(value) => setFormData((prev) => ({ ...prev, passwordRepeat: value }))}
              type="password"
              label="Повторите пароль"
            />
          )}
          {error && (
            <div className="space-y-1">
              {error?.message && (
                <p className="text-system-error">
                  {error.message}
                  {error.errors?.length !== 0 && ':'}
                </p>
              )}
              {error.errors?.length !== 0 && (
                <ul className="space-y-1">
                  {error.errors?.map(({ message }, index) => (
                    <li className="text-system-error" key={index}>
                      {message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
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
      <div className="mt-auto py-2 text-center">
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
