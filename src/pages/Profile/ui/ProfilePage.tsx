import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import useUser, { UserType } from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'
import { backendUrl } from '@/shared/config'

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate()
  const { user, token, status, setUser, setToken, setStatus } = useUser()
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)

  function logout() {
    setToken(null)
    setUser(null)
  }

  // TODO: состояние загрузки (скелетон шапки), и неудачного fetchUser

  // TODO: вынести fetch в api
  async function fetchUser() {
    try {
      axios.defaults.baseURL = backendUrl
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      }
      setStatus('loading')
      const { data } = await axios.get<UserType>('/profile')
      setUser(data)
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (token) fetchUser()
  }, [token])

  return (
    <>
      <div className="flex items-center gap-2 py-2">
        {!user && (
          <div className="surface-low grid size-10 shrink-0 place-content-center rounded-full">
            <svg className="size-5">
              <use href="/images/icons.svg#user" />
            </svg>
          </div>
        )}
        {user && (
          <img
            className="size-10 rounded-full"
            src="/images/avatar.jpg"
            alt="Аватар пользователя"
          />
        )}
        {!user && <Button text="Войти" icon="login" block link="/login" />}
        {user && (
          <div className="space-y-0.5">
            <p className="headline-small">Имя пользователя</p>
            <p className="text-secondary-color">{user?.email}</p>
          </div>
        )}
      </div>
      <ul className="layout-fullwidth py-1">
        {user && (
          <ListItem
            text="Редактировать профиль"
            size="medium"
            rightElement={{
              element: 'icon',
              icon: 'chevron_right',
            }}
            onClick={() => navigate('/profile/edit')}
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
