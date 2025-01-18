import { AuthUserDTO, UpdateProfileDTO } from './api'

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

type Status = 'init' | 'loading' | 'success' | 'error'

export type UserStore = {
  user: IUser | null
  status: Status
  setUser: (value: IUser) => void
  setStatus: (value: Status) => void
  registration: (AuthUserDTO: AuthUserDTO) => Promise<void>
  login: (AuthUserDTO: AuthUserDTO) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
  updateProfile: (userId: string, UpdateProfileDTO: UpdateProfileDTO) => Promise<void>
  favouriteRecipes: string[]
  addFavouriteRecipe: (id: string) => void
  removeFavouriteRecipe: (id: string) => void
}
