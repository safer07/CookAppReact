import { cn } from '../lib'

type ChipProps = {
  text: string
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  variant?: 'active' | 'default'
  del?: boolean
}

export default function Chip({
  text,
  onClick,
  variant,
  del = false,
}: ChipProps): React.JSX.Element {
  return (
    <button
      className={cn('chip', { active: variant === 'active', 'chip-delete': del })}
      onClick={onClick}
    >
      {text}
      {del && (
        <svg>
          <use href="/images/icons.svg#cross" />
        </svg>
      )}
    </button>
  )
}
