import { useFavorites } from '@/entities/favorites/@x/user'

import { ACCESS_TOKEN_KEY } from '@/shared/config'

import { useUser } from '../store/userStore'

export function afterLogout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  useUser.setState({ user: null })
  useFavorites.getState().resetFavorites()
}
