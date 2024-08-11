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

export type LoginErrorResponse = {
  message: string
}
