import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import TopAppBar from '@/widgets/top-app-bar'

import { useFavorites } from '@/entities/favorites'
import {
  afterLogin,
  loginFormDataSchema,
  registrationFormDataSchema,
  userService,
} from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError, HttpStatus, LocationState } from '@/shared/model'
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/button'
import ErrorComponent from '@/shared/ui/error-component'
import Input from '@/shared/ui/input'

import PrivacyAccepting from './privacy-accepting'

type State = {
  email: string
  password: string
  passwordRepeat: string
}

export default function AuthPage(): React.JSX.Element {
  const location = useLocation()
  const [status, setStatus] = useState<HttpStatus>('init')
  const [error, setError] = useState<CustomError>(null)
  const [state, setState] = useState<State>({ email: '', password: '', passwordRepeat: '' })
  const isRegistration = location.pathname === REGISTRATION_ROUTE
  const isLogin = !isRegistration
  const { from } = (location.state as LocationState) ?? { from: { pathname: MAIN_ROUTE } }

  async function onSubmit(formData: FormData) {
    setError(null)

    const data = {
      email: (formData.get('email') as string | null) ?? '',
      password: (formData.get('password') as string | null) ?? '',
      passwordRepeat: (formData.get('passwordRepeat') as string | null) ?? '',
    }
    setState(data)

    const result = isLogin
      ? loginFormDataSchema.safeParse(data)
      : registrationFormDataSchema.safeParse(data)
    if (result.success) {
      try {
        const payload = isLogin
          ? result.data
          : { ...result.data, favorites: useFavorites.getState().favorites }
        setStatus('loading')
        const response = isLogin
          ? await userService.login(payload)
          : await userService.registration(payload)
        afterLogin(response)
        useFavorites.getState().resetFavorites()
        setStatus('success')
      } catch (error) {
        setStatus('error')
        catchHttpError(error, setError)
      }
    } else {
      setError({
        errors: formatZodError(result),
      })
    }
  }

  useEffect(() => {
    setError(null)
  }, [location])

  return (
    <>
      <TopAppBar title={isLogin ? 'Вход' : 'Регистрация'} back />
      <form className="mt-2 space-y-3" action={onSubmit}>
        <div className="space-y-2">
          <Input defaultValue={state.email} type="email" label="Email" name="email" />
          <div className="flex flex-col gap-1">
            <Input defaultValue={state.password} type="password" label="Пароль" name="password" />
            {isLogin && (
              <Link to={FORGOT_PASSWORD_ROUTE} className="link self-end font-bold" replace>
                Забыли пароль?
              </Link>
            )}
          </div>
          {!isLogin && (
            <Input
              defaultValue={state.passwordRepeat}
              type="password"
              label="Повторите пароль"
              name="passwordRepeat"
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
          className="link font-bold"
          state={{ from }}
          replace
        >
          {isLogin ? 'Регистрация' : 'Вход'}
        </Link>
      </div>
    </>
  )
}
