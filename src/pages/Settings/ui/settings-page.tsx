import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import { EDIT_PROFILE_ROUTE } from '@/shared/routes'
import ErrorComponent from '@/shared/ui/error-component'
import ListItem from '@/shared/ui/list-item'
import Modal from '@/shared/ui/modal'

import { logout } from '../lib/logout'
import { useFetchUser } from '../lib/use-fetch-user'
import UserInfo from './user-info'

export default function SettingsPage(): React.JSX.Element {
  const navigate = useNavigate()
  const { user } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)
  const { error: fetchError, isLoading } = useFetchUser(user?.id)
  const error = catchHttpError(fetchError)

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
            onClick={() => setModalLogoutIsOpen(true)}
          />
        )}
      </ul>

      <Modal
        open={modalLogoutIsOpen}
        setOpen={setModalLogoutIsOpen}
        onOk={logout}
        okText="Выйти"
        title="Выход"
        text="Вы уверены, что хотите выйти из учётной записи?"
        type="negative"
        cancellable
      />
    </>
  )
}
