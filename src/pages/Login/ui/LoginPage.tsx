import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import { backendUrl } from '@/shared/config'

export type LoginFormDataType = {
  email: string
  password: string
}

export type LoginResponse = {
  message: string
  token: string
}

export type ValidationError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

export type LoginValidationErrorResponse = ValidationError[]

export type LoginErrorResponse = {
  message: string
}

const emptyForm = { email: '', password: '' }

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormDataType>(emptyForm)
  const [errors, setErrors] = useState<string[]>([])

  // TODO: проверять токен в localStorage и перенаправлять
  // navigate("/profile", { replace: true });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors([])
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(formData),
    }

    try {
      // TODO: вынести fetch в api
      const response = await fetch(`${backendUrl}/login`, requestOptions)
      // подтверждение отправки
      // здесь приходит код 400
      console.log(response)

      if (!response.ok) {
        const data: LoginValidationErrorResponse | LoginErrorResponse =
          await response.json()
        if (Array.isArray(data)) setErrors(data.map((error) => error.msg))
        else setErrors([data?.message])
        return
      }

      const data: LoginResponse = await response.json()

      // TODO: сохранить токен
      console.log(data?.message)
      console.log(data?.token)
      navigate('/profile', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TopAppBar title="Вход" back />
      <form className="mt-2 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Input
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
            type="email"
            label="Email"
          />
          <Input
            value={formData.password}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, password: value }))
            }
            type="password"
            label="Пароль"
          />
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
        <Button
          variant="primary"
          text="Войти"
          onClick={() => {}}
          block
          submit
        />
      </form>
      <div className="mt-auto py-2 text-center">
        <span>Нет аккаунта? </span>
        <Link
          to="/registration"
          className="font-bold text-primary hover-hover:hover:text-primary-active"
        >
          Регистрация
        </Link>
      </div>
    </>
  )
}
