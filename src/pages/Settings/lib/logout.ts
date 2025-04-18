import toast from 'react-hot-toast'

import { afterLogout, userService } from '@/entities/user'

export async function logout() {
  toast.promise(
    async () => {
      await userService.logout()
      afterLogout()
    },
    {
      loading: 'Выход...',
      success: 'Выход совершён',
      error: 'Не удалось выйти из профиля',
    },
  )
}
