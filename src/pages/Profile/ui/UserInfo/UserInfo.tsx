import UserInfoSkeleton from './UserInfoSkeleton'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import { LOGIN_ROUTE } from '@/shared/routes'

export default function UserInfo(): React.JSX.Element {
  const { user } = useUser()
  const name = user?.name || ''
  const lastName = user?.lastName || ''
  const userName = name || lastName ? `${name} ${lastName}`.trim() : 'Имя не указано'

  return (
    <div className="flex items-center gap-2 py-2">
      {!user && (
        <div className="surface-low grid size-10 shrink-0 place-content-center rounded-full">
          <svg className="size-5">
            <use href="/images/icons.svg#user" />
          </svg>
        </div>
      )}
      {user && (
        <img className="size-10 rounded-full" src="/images/avatar.jpg" alt="Аватар пользователя" />
      )}
      {!user && <Button text="Войти" icon="login" fullWidth link={LOGIN_ROUTE} />}
      {user && (
        <div className="space-y-0.5">
          <p className="headline-small">{userName}</p>
          <p className="text-secondary-color">{user?.email}</p>
        </div>
      )}
    </div>
  )
}

UserInfo.Skeleton = UserInfoSkeleton
