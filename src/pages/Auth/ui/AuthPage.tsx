import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'

import PrivacyAccepting from './PrivacyAccepting'
import TopAppBar from '@/widgets/TopAppBar'
import {
  AuthErrorResponse,
  LoginFormDataType,
  RegistrationFormDataType,
  ValidationError,
} from '@/entities/user/model/api'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import { LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from '@/shared/routes'

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
  const { user, status, login, registration } = useUser()
  const isLogin: boolean = location.pathname === LOGIN_ROUTE

  // let formDataType
  // if (isLogin) type formDataType = LoginFormDataType
  // else type formDataType = RegistrationFormDataType

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

  // TODO: как типизировать форму в зависимости от isLogin?
  // const [formData, setFormData] = useState<LoginFormDataType | RegistrationFormDataType>(
  //   initialFormData,
  // )
  //   const [formData, setFormData] = useState(initialFormData)
  const [formData, setFormData] = useState<RegistrationFormDataType>(emptyRegistrationForm)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // TODO: вместо этого переносить на страницу, откуда перешёл к логину (или это делается в route?)
    if (user) navigate(PROFILE_ROUTE, { replace: true })
  }, [user])

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
      isLogin ? await login(formData) : await registration(formData)
    } catch (error) {
      // TODO: ошибки переписываются на основании типового ответа (не express-validator)
      // if (error instanceof AxiosError) {const data = error.response?.data}
      if (axios.isAxiosError<ValidationError[] | AuthErrorResponse>(error)) {
        const data = error.response?.data
        if (data) {
          if (Array.isArray(data)) setErrors(data.map((error) => error.msg))
          else setErrors([data?.message])
        }
      }
      console.log(error)
      // TODO: ничего не указывается, если zod выдаёт ошибку, и статус ни на что не влияет
      // setStatus('error')
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
