import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import { backendUrl } from '@/shared/config'
import {
  LoginErrorResponse,
  LoginFormDataType,
  LoginResponse,
  ValidationError,
} from '../model/types'

const emptyForm = { email: '', password: '' }

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const { token, status, setToken, setStatus } = useUser()
  const [formData, setFormData] = useState<LoginFormDataType>(emptyForm)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // TODO: вместо этого переносить на страницу, откуда перешёл к логину
    if (token) navigate('/profile', { replace: true })
  }, [token])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors([])

    axios.defaults.baseURL = backendUrl
    const requestOptions = {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }

    try {
      // TODO: вынести fetch в api
      setStatus('loading')
      const { data } = await axios.post<LoginResponse>('/login', formData, requestOptions)
      setToken(data.token)
      setStatus('success')
    } catch (error) {
      if (axios.isAxiosError<ValidationError[] | LoginErrorResponse>(error)) {
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
      <TopAppBar title="Вход" back />
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
          block
          submit
          disabled={status === 'loading'}
          loading={status === 'loading'}
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
