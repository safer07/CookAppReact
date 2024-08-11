import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Button from '@/shared/ui/Button'
import ListItem from '@/shared/ui/ListItem'
import Modal from '@/shared/ui/Modal'
import { backendUrl } from '@/shared/config'

export type UserType = {
  email: string
}

export default function ProfilePage(): JSX.Element {
  // const [token, setToken] = useState<string | null>(
  //   localStorage.getItem('token'),
  // )
  const [user, setUser] = useState<UserType | null>(null)
  const [modalLogoutIsOpen, setModalLogoutIsOpen] = useState<boolean>(false)
  const token = localStorage.getItem('token')

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  // TODO: состояние загрузки (скелетон шапки), и неудачного fetchUser

  useEffect(() => {
    if (!token) return
    try {
      // TODO: вынести fetch в api
      ;(async () => {
        axios.defaults.baseURL = backendUrl
        axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        }

        const { data } = await axios.get<UserType>('/profile')
        setUser(data)
      })()
    } catch (error) {
      console.error(error)
    }
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
        {!user && (
          <Link to="/login" className="w-full">
            <Button text="Войти" icon="login" block />
          </Link>
        )}
        {user && (
          <div className="space-y-0.5">
            <p className="headline-small">Имя пользователя</p>
            <p className="text-secondary-color">{user?.email}</p>
          </div>
        )}
      </div>
      <ul className="layout-fullwidth py-1">
        <ListItem
          text="Пользовательское соглашение"
          rightElement={{
            element: 'icon',
            icon: 'chevron_right',
          }}
        />
        <ListItem
          text="Политика конфиденциальности"
          rightElement={{
            element: 'icon',
            icon: 'chevron_right',
          }}
        />
        {user && (
          <ListItem
            text="Выйти"
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
