import { AuthUserDTO, UpdateProfileDTO } from './api'

export interface IUser {
  _id: string
  email: string
  password: string
  name: string
  lastName: string
  avatarUrl: string
  gender: string
  birthDate: string
  isEmailVerified: boolean
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
  registration: (authUserDTO: AuthUserDTO) => Promise<void>
  login: (authUserDTO: AuthUserDTO) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
  updateProfile: (userId: string, updateProfileDTO: UpdateProfileDTO) => Promise<void>
  favouriteRecipes: string[]
  addFavouriteRecipe: (id: string) => void
  removeFavouriteRecipe: (id: string) => void
}
