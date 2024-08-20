import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import { backendUrl } from '@/shared/config'
import {
  RegistrationErrorResponse,
  RegistrationFormDataType,
  RegistrationResponse,
  ValidationError,
} from '../model/types'

const emptyForm = { email: '', password: '', passwordRepeat: '' }

export default function RegistrationPage(): JSX.Element {
  const navigate = useNavigate()
  const { token, status, setToken, setStatus } = useUser()
  const [formData, setFormData] = useState<RegistrationFormDataType>(emptyForm)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // TODO: вместо этого переносить на страницу, откуда перешёл к логину
    if (token) navigate('/profile', { replace: true })
  }, [token])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors([])

    if (formData.password !== formData.passwordRepeat) {
      return setErrors(['Пароль не совпадает'])
    }

    axios.defaults.baseURL = backendUrl
    const requestOptions = {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }

    try {
      // TODO: вынести fetch в api
      setStatus('loading')
      const { data } = await axios.post<RegistrationResponse>(
        '/registration',
        formData,
        requestOptions,
      )
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setStatus('success')
    } catch (error) {
      if (axios.isAxiosError<ValidationError[] | RegistrationErrorResponse>(error)) {
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
      <TopAppBar title="Регистрация" back />
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
          <Input
            value={formData.passwordRepeat}
            onChange={(value) => setFormData((prev) => ({ ...prev, passwordRepeat: value }))}
            type="password"
            label="Повторите пароль"
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
        <p>
          <span>Нажимая “Зарегистрироваться”, вы принимаете условия </span>
          <Link
            to="/privacy-policy"
            className="font-bold text-primary hover-hover:hover:text-primary-active"
          >
            политики конфиденциальности
          </Link>
          <span> и </span>
          <Link
            to="/terms-of-service"
            className="font-bold text-primary hover-hover:hover:text-primary-active"
          >
            пользовательского соглашения
          </Link>
        </p>
        <Button
          variant="primary"
          text="Зарегистрироваться"
          block
          submit
          disabled={status === 'loading'}
          loading={status === 'loading'}
        />
      </form>
      <div className="mt-auto py-2 text-center">
        <span>Уже есть аккаунт? </span>
        <Link to="/login" className="font-bold text-primary hover-hover:hover:text-primary-active">
          Вход
        </Link>
      </div>
    </>
  )
}
