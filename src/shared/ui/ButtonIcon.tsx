import { cn } from '../lib'

type ButtonIconProps = {
  icon: string
  onClick: () => void
  className?: string
  variant?: 'primary' | 'tertiary' | 'ghost'
  size?: 'small' | 'medium'
  square?: boolean
  badge?: number
}

export default function ButtonIcon({
  icon,
  onClick,
  className = '',
  variant = 'ghost',
  size = 'medium',
  square,
  badge,
}: ButtonIconProps) {
  const variantClass = (() => {
    switch (variant) {
      case 'primary':
        return 'button-icon-primary'
      case 'tertiary':
        return 'button-icon-tertiary'
      case 'ghost':
        return 'button-icon-ghost'
      default:
        return ''
    }
  })()

  return (
    <button
      className={cn('button-icon', className, variantClass, {
        'button-icon-medium': size === 'medium',
        'button-icon-small': size !== 'medium',
        'button-icon-square': square,
      })}
      onClick={onClick}
    >
      <svg>
        <use href={`/images/icons.svg#${icon}`} />
      </svg>
      {badge !== 0 && <span className="button-icon-badge">{badge}</span>}
    </button>
  )
}
