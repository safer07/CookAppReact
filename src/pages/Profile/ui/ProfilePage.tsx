import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserInfo from './UserInfo'
import useUser from '@/entities/user/store/store'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'
import { EDIT_PROFILE_ROUTE, LOGIN_ROUTE } from '@/shared/routes'

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate()
  const { user, status, logout, fetchUser } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)

  // TODO: состояние неудачного fetchUser и logout

  // TODO: создать массив для ListItem, чтобы делать их через map (для авторизованных и обычные ссылки)

  useEffect(() => {
    if (!user) navigate(LOGIN_ROUTE, { replace: true })
  }, [user])

  useEffect(() => {
    // TODO: зачем? или просто каждый раз делать fetch, или без условия (проверить на ошибки, когда не залогинен)
    if (user) fetchUser()
  }, [])

  return (
    <>
      {status !== 'loading' ? <UserInfo /> : <UserInfo.Skeleton />}
      <ul className="layout-fullwidth py-1">
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
