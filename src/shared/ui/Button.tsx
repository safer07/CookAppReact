import { Link } from 'react-router-dom'

import { cn } from '../lib'

type BaseProps = {
  text: string
  icon?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'negative'
  fullWidth?: boolean
}

type LinkProps = {
  link: string
  state?: object
} & BaseProps

type ButtonProps = {
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  link?: never
  loading?: boolean
} & BaseProps

export default function Button(props: ButtonProps | LinkProps) {
  const { text, icon, className = '', variant, fullWidth } = props
  let link, onClick, disabled, type, loading, state
  if (props?.link !== undefined) {
    link = props.link
    state = props.state
  } else {
    onClick = props.onClick
    disabled = props.disabled
    type = props.type || 'button'
    loading = props.loading
  }
  const variantClass = (() => {
    switch (variant) {
      case 'primary':
        return 'button-primary'
      case 'tertiary':
        return 'button-tertiary'
      case 'negative':
        return 'button-negative'
      case 'secondary':
      default:
        return 'button-secondary'
    }
  })()

  return (
    <>
      {link ? (
        <Link
          to={link}
          className={cn('button', className, variantClass, { 'w-full': fullWidth })}
          state={state}
        >
          {icon && (
            <svg>
              <use href={`/images/icons.svg#${icon}`} />
            </svg>
          )}
          <span>{text}</span>
        </Link>
      ) : (
        <button
          className={cn('button', className, variantClass, { 'w-full': fullWidth })}
          onClick={disabled ? () => {} : onClick}
          disabled={disabled}
          type={type}
        >
          {icon && !loading && (
            <svg>
              <use href={`/images/icons.svg#${icon}`} />
            </svg>
          )}
          {loading && (
            <svg className="animate-spin">
              <use href={'/images/icons.svg#loader'} />
            </svg>
          )}
          <span>{loading ? 'Загрузка...' : text}</span>
        </button>
      )}
    </>
  )
}
