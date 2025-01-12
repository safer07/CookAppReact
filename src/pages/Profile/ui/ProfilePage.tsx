import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import UserInfo from './UserInfo'
import useUser, { UserType } from '@/entities/user/store/store'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'
import { backendUrl } from '@/shared/config'
import { EDIT_PROFILE_ROUTE } from '@/shared/routes'

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate()
  const { user, accessToken, status, setUser, setAccessToken, setStatus } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)

  function logout() {
    setAccessToken(null)
    setUser(null)
  }

  // TODO: состояние неудачного fetchUser

  // TODO: создать массив list item, чтобы делать их через map (для авторизованных и обычные ссылки)

  // TODO: вынести fetch в api
  async function fetchUser() {
    try {
      axios.defaults.baseURL = backendUrl
      axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      }
      setStatus('loading')
      const { data } = await axios.get<UserType>('/users/profile')
      setUser(data)
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (accessToken && !user) fetchUser()
  }, [accessToken])

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
