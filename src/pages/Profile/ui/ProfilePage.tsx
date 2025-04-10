import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { catchHttpError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import { EDIT_PROFILE_ROUTE } from '@/shared/routes'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'

import UserInfo from './UserInfo'

export default function ProfilePage(): React.JSX.Element {
  const navigate = useNavigate()
  const { user, status, logout, fetchUser } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<CustomError>(null)
  const isAuth: boolean = user !== null

  // TODO: создать массив для ListItem, чтобы делать их через map (для авторизованных и обычные ссылки)

  async function onLogout() {
    try {
      await logout()
    } catch (error) {
      catchHttpError(error, setError)
    }
  }

  useEffect(() => {
    async function onFetchUser() {
      setError(null)
      try {
        await fetchUser()
      } catch (error) {
        catchHttpError(error, setError)
      }
    }

    if (isAuth) onFetchUser()
  }, [navigate, fetchUser, isAuth])

  useEffect(() => {
    setError(null)
  }, [user])

  return (
    <>
      {status !== 'loading' ? <UserInfo /> : <UserInfo.Skeleton />}
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
        onOk={onLogout}
        okText="Выйти"
        title="Выход"
        text="Вы уверены, что хотите выйти из учётной записи?"
        type="negative"
        cancellable
      />
    </>
  )
}
