import { User } from '.'
import { AuthUserDTO, UpdateProfileDTO } from './api'

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
  resetPassword: (link: string, password: string) => Promise<void>
  changePassword: (password: string) => Promise<void>
  favouriteRecipes: string[]
  addFavouriteRecipe: (id: string) => void
  removeFavouriteRecipe: (id: string) => void
}
