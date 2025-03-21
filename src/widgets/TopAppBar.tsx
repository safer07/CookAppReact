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
          <button>
            <svg
              onClick={backOnClick ? backOnClick : () => navigateBack(navigate)}
              className="size-3"
            >
              <use href="/images/icons.svg#arrow_left" />
            </svg>
          </button>
        )}
        <div className="flex grow items-center gap-3">
          <h1 className="headline-large line-clamp-1 grow">{title}</h1>
          {rightIcon && (
            <button>
              <svg onClick={rightIcon.onClick} className="size-3">
                <use href={`/images/icons.svg#${rightIcon.icon}`} />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
