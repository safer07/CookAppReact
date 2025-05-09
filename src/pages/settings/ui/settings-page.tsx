import { useNavigate } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { catchHttpError, useConfirm } from '@/shared/lib'
import { EDIT_PROFILE_ROUTE } from '@/shared/routes'
import ErrorComponent from '@/shared/ui/error-component'
import ListItem from '@/shared/ui/list-item'

import { logout } from '../lib/logout'
import { useFetchUser } from '../lib/use-fetch-user'
import UserInfo from './user-info'

const confirmLogoutProps = {
  okText: 'Выйти',
  title: 'Выход',
  text: 'Вы уверены, что хотите выйти из учётной записи?',
}

export default function SettingsPage(): React.JSX.Element {
  const navigate = useNavigate()
  const { user } = useUser()
  const [ConfirmLogoutModal, confirmLogout] = useConfirm(confirmLogoutProps)
  const { error: fetchError, isLoading } = useFetchUser(user?.id)
  const error = catchHttpError(fetchError)

  async function handleLogout(): Promise<void> {
    const ok = await confirmLogout()
    if (ok) logout()
  }

  // TODO: создать массив для ListItem, чтобы делать их через map (для авторизованных и обычные ссылки)

  return (
    <>
      {isLoading ? <UserInfo.Skeleton /> : <UserInfo />}
      <ErrorComponent error={error} />
      <ul className="layout-wide py-1">
        {user && (
          <ListItem
            text="Редактировать профиль"
            size="medium"
            rightElement={{
              element: 'icon',
              icon: 'chevron_right',
            }}
            onClick={() => navigate(EDIT_PROFILE_ROUTE)}
          />
        )}
        <ListItem
          text="Пользовательское соглашение"
          size="medium"
          rightElement={{
            element: 'icon',
            icon: 'chevron_right',
          }}
        />
        <ListItem
          text="Политика конфиденциальности"
          size="medium"
          rightElement={{
            element: 'icon',
            icon: 'chevron_right',
          }}
        />
        {user && (
          <ListItem
            text="Выйти"
            size="medium"
            leftElement={{
              element: 'icon',
              icon: 'logout',
              className: 'text-system-error',
            }}
            onClick={handleLogout}
          />
        )}
      </ul>

      <ConfirmLogoutModal />
    </>
  )
}
