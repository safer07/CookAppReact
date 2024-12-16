export type LoginFormDataType = {
  email: string
  password: string
}

export type LoginResponse = {
  message: string
  token: string
}

export type LoginErrorResponse = {
  message: string
}

export type RegistrationFormDataType = {
  email: string
  password: string
  passwordRepeat: string
}

export type RegistrationResponse = {
  message: string
  token: string
}

export type RegistrationErrorResponse = {
  message: string
}

export type ValidationError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}
