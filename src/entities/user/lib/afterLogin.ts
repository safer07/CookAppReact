import { useFavorites } from '@/entities/favorites/@x/user'

import { queryClient } from '@/shared/api'
import { ACCESS_TOKEN_KEY } from '@/shared/config'

import { AuthResponse } from '../model/api'
import { useUser } from '../store/userStore'

export function afterLogin(response: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken)
  queryClient.setQueryData(['user', response.user.id], response.user)
  useUser.setState({ user: response.user })
  useFavorites.getState().getFavorites()
}
