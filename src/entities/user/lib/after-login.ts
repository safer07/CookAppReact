import { queryClient } from '@/shared/api'
import { ACCESS_TOKEN_KEY } from '@/shared/config'

import { AuthResponse } from '../model/api'
import { useUser } from '../store/user-store'

export function afterLogin(response: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
  queryClient.setQueryData(['user', response.user.id], response.user)
  useUser.setState({ user: response.user })
}
