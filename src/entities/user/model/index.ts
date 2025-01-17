export interface IUser {
  _id: string
  email: string
  password: string
  name: string
  lastName: string
  avatarUrl: string
  gender: 'male' | 'female'
  // birthDate: Date
  birthDate: string
  isEmailVerificated: boolean
  emailVerificationLink: string
  forgotPasswordLink: string | null
  forgotPasswordDate: Date | null
}
