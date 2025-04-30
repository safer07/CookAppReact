import { useNavigate } from 'react-router-dom'

import { navigateBack } from '@/shared/lib'

type Icon = {
  icon: string
  onClick: () => void
}

type TopAppBarProps = {
  title: string
  back?: boolean
  backOnClick?: () => void
  rightIcon?: Icon
}

function Icon({ icon }: { icon: string; className?: string }): React.JSX.Element {
  return (
    <svg className="size-3" aria-hidden="true">
      <use href={`/images/icons.svg#${icon}`} />
    </svg>
  )
}

export default function TopAppBar({
  title,
  back,
  backOnClick,
  rightIcon,
}: TopAppBarProps): React.JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2">
        {back && (
          <button
            type="button"
            onClick={backOnClick ? backOnClick : () => navigateBack(navigate)}
            aria-label="Назад"
          >
            <Icon icon="arrow_left" />
          </button>
        )}
        <div className="flex grow items-center gap-3">
          <h1 className="headline-large line-clamp-1 grow">{title}</h1>
          {rightIcon && (
            <button type="button" onClick={rightIcon.onClick}>
              <Icon icon={rightIcon.icon} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
