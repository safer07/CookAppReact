import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'
import {
  LoginErrorResponse,
  LoginFormDataType,
  RegistrationErrorResponse,
  RegistrationFormDataType,
  ValidationError,
} from '../model/types'
import { login, registration } from '../api/auth'
import PrivacyAccepting from './PrivacyAccepting'

const emptyLoginForm: LoginFormDataType = { email: '', password: '' }
const emptyRegistrationForm: RegistrationFormDataType = {
  email: '',
  password: '',
  passwordRepeat: '',
}

// type FormDataType = LoginFormDataType | RegistrationFormDataType

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const isLogin: boolean = location.pathname === LOGIN_ROUTE
  //   const isLogin: boolean = false
  //   let initialFormData
  //   if (isLogin) {
  //     initialFormData = emptyLoginForm
  //   } else {
  //     initialFormData = emptyRegistrationForm
  //   }
  // const initialFormData: LoginFormDataType | RegistrationFormDataType = isLogin
  //   ? emptyLoginForm
  //   : emptyRegistrationForm
  const { token, status, setToken, setStatus } = useUser()
  // TODO: как типизировать форму в зависимости от isLogin?
  // const [formData, setFormData] = useState<LoginFormDataType | RegistrationFormDataType>(
  //   initialFormData,
  // )
  //   const [formData, setFormData] = useState(initialFormData)
  const [formData, setFormData] = useState<RegistrationFormDataType>(emptyRegistrationForm)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // TODO: вместо этого переносить на страницу, откуда перешёл к логину (или это делается в route?)
    if (token) navigate(PROFILE_ROUTE, { replace: true })
  }, [token])

  // //   function foo(): string
  // // function foo<B extends boolean | undefined>(isLogin: B): B extends true ? number : string
  // function foo(): RegistrationFormDataType
  // function foo<B extends boolean | undefined>(isLogin: B): B extends true ? LoginFormDataType : RegistrationFormDataType

  // // function foo(x?: boolean): number | string {
  // //   return x ? 123 : 'asdf'
  // // }

  // function foo(isLogin?: boolean): LoginFormDataType | RegistrationFormDataType {
  //   return isLogin ? emptyLoginForm : emptyRegistrationForm
  // }

  // const isLogin = false
  // if (isLogin) {
  //     const dataType = foo(isLogin)
  //     // dataType.
  // }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // TODO: Нет валидации на клиенте, например, через zod. Не проверяет даже пустая ли форма
    event.preventDefault()
    setErrors([])

    if (!isLogin && formData.password !== formData.passwordRepeat) {
      return setErrors(['Пароль не совпадает'])
    }

    try {
      setStatus('loading')
      let data
      if (isLogin) {
        data = await login(formData)
      } else {
        data = await registration(formData)
      }
      setToken(data.token)
      setStatus('success')
    } catch (error) {
      if (
        axios.isAxiosError<ValidationError[] | LoginErrorResponse | RegistrationErrorResponse>(
          error,
        )
      ) {
        const data = error.response?.data
        if (data) {
          if (Array.isArray(data)) setErrors(data.map((error) => error.msg))
          else setErrors([data?.message])
        }
      }
      setStatus('error')
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
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p className="text-system-error" key={index}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {!isLogin && <PrivacyAccepting />}

        <Button
          variant="primary"
          text={isLogin ? 'Войти' : 'Зарегистрироваться'}
          block
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
