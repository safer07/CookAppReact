import { AuthUserDTO, UpdateProfileDTO } from './api'

export type User = {
  _id: string
  email: string
  name?: string
  lastName?: string
  avatarUrl?: string
  gender?: string
  birthDate?: string | null
}

type Status = 'init' | 'loading' | 'success' | 'error'

export type UserStore = {
  user: User | null
  status: Status
  setUser: (value: User) => void
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
