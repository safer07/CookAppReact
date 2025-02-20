import type { HttpStatus } from '@/shared/model'
import { User } from './user'
import { AuthUserDTO, UpdateProfileDTO } from './api'

export type UserStore = {
  user: User | null
  status: HttpStatus
  setUser: (value: User | null) => void
  setStatus: (value: HttpStatus) => void
  registration: (authUserDTO: AuthUserDTO) => Promise<void>
  login: (authUserDTO: AuthUserDTO) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
  updateProfile: (userId: string, updateProfileDTO: UpdateProfileDTO) => Promise<void>
  resetPassword: (link: string, password: string) => Promise<void>
  changePassword: (password: string) => Promise<void>
}
