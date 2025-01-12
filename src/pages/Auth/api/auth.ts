import axios from 'axios'
import { backendUrl } from '@/shared/config'
import {
  AuthResponse,
  authResponseSchema,
  LoginFormDataType,
  RegistrationFormDataType,
} from '../model/types'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true
const requestOptions = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
}

export async function login(formData: LoginFormDataType) {
  const { data } = await axios.post<AuthResponse>('/users/login', formData, requestOptions)
  const validatedData = authResponseSchema.parse(data)
  return validatedData

  // TODO: как валидировать?
  // const validatedData = authResponseSchema.safeParse(data)
  // console.log(validatedData)
  // if (!validatedData.success) return console.error(validatedData.error)
  // else return data
}

export async function registration(formData: RegistrationFormDataType) {
  const { data } = await axios.post<AuthResponse>('/users/registration', formData, requestOptions)
  const validatedData = authResponseSchema.parse(data)
  return validatedData
}
