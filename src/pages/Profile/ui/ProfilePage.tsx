import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { afterLogout, useUser, userService } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import { EDIT_PROFILE_ROUTE } from '@/shared/routes'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'

import { useFetchUser } from '../lib/useFetchUser'
import UserInfo from './UserInfo'

async function logout() {
  try {
    await userService.logout()
    afterLogout()
  } catch {
    toast.error('Не удалось выйти из профиля')
  }
}

export default function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate()
  const { user } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)
  const isAuth: boolean = user !== null
  const { error: fetchError, isLoading } = useFetchUser(isAuth, user?.id)
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
