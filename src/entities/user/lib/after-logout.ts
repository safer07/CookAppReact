import { ACCESS_TOKEN_KEY } from '@/shared/config'

import { useUser } from '../store/user-store'

export function afterLogout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  useUser.setState({ user: null })
}
