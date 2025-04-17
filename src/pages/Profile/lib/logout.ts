import toast from 'react-hot-toast'

import { afterLogout, userService } from '@/entities/user'

export async function logout() {
  try {
    await userService.logout()
    afterLogout()
  } catch {
    toast.error('Не удалось выйти из профиля')
  }
}
