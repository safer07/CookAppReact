import { useLocation } from 'react-router-dom'

import { useUser } from '@/entities/user'

import { LOGIN_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'

import UserInfoSkeleton from './UserInfoSkeleton'

export default function UserInfo(): React.JSX.Element {
  const location = useLocation()
  const { user } = useUser()
  const name = user?.name ?? ''
  const lastName = user?.lastName ?? ''
  const userName = name || lastName ? `${name} ${lastName}`.trim() : 'Имя не указано'

  return (
    <div className="flex items-center gap-2 py-2">
      {user ? (
        <>
          <img
            className="size-10 rounded-full"
            src="/images/avatar.jpg"
            alt="Аватар пользователя"
          />
          <div className="space-y-0.5">
            <p className="headline-small">{userName}</p>
            <p className="text-txt-secondary">{user?.email}</p>
          </div>
        </>
      ) : (
        <>
          <div className="surface-low grid size-10 shrink-0 place-content-center rounded-full">
            <svg className="size-5">
              <use href="/images/icons.svg#user" />
            </svg>
          </div>
          <Button
            text="Войти"
            icon="login"
            fullWidth
            link={LOGIN_ROUTE}
            state={{ from: location }}
          />
        </>
      )}
    </div>
  )
}

UserInfo.Skeleton = UserInfoSkeleton
