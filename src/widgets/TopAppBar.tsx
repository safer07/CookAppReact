import { useNavigate } from 'react-router-dom'

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
}: TopAppBarProps) {
  const navigate = useNavigate()

  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2">
        {back && (
          <svg
            onClick={backOnClick ? backOnClick : () => navigate(-1)}
            className="size-3 cursor-pointer"
          >
            <use href="/images/icons.svg#arrow_left" />
          </svg>
        )}
        <div className="flex grow items-center gap-3">
          <h1 className="headline-large line-clamp-1 grow">{title}</h1>
          {rightIcon && (
            <svg onClick={rightIcon.onClick} className="size-3 cursor-pointer">
              <use href={`/images/icons.svg#${rightIcon.icon}`} />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
