import axios from 'axios'
import { backendUrl } from '@/shared/config'
import {
  LoginFormDataType,
  LoginResponse,
  RegistrationFormDataType,
  RegistrationResponse,
} from '../model/types'

axios.defaults.baseURL = backendUrl
const requestOptions = {
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
}

export async function login(formData: LoginFormDataType) {
  const { data } = await axios.post<LoginResponse>('/login', formData, requestOptions)
  return data
}

export async function registration(formData: RegistrationFormDataType) {
  const { data } = await axios.post<RegistrationResponse>('/registration', formData, requestOptions)
  return data
}
