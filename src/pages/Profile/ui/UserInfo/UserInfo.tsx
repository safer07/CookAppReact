import UserInfoSkeleton from './UserInfoSkeleton'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'

export default function UserInfo(): JSX.Element {
  const { user } = useUser()

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
      {!user && <Button text="Войти" icon="login" block link="/login" />}
      {user && (
        <div className="space-y-0.5">
          <p className="headline-small">
            {user?.name || user?.lastName ? `${user?.name} ${user?.lastName}` : 'Имя не указано'}
          </p>
          <p className="text-secondary-color">{user?.email}</p>
        </div>
      )}
    </div>
  )
}

UserInfo.Skeleton = UserInfoSkeleton
