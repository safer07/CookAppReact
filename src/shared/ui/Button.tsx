import { Link } from 'react-router-dom'

type BaseProps = {
  text: string
  icon?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'negative'
  block?: boolean
}

type LinkProps = {
  link: string
} & BaseProps

type ButtonProps = {
  onClick?: () => void
  disabled?: boolean
  submit?: boolean
  link?: never
  loading?: boolean
} & BaseProps

export default function Button(props: ButtonProps | LinkProps) {
  const { text, icon, className = '', variant, block } = props
  let link, onClick, disabled, submit, loading
  if (props?.link !== undefined) {
    link = props.link
  } else {
    onClick = props.onClick
    disabled = props.disabled
    submit = props.submit
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
          className={`button ${className} ${variantClass} ${block ? 'w-full' : ''}`}
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
          className={`button ${className} ${variantClass} ${block ? 'w-full' : ''}`}
          onClick={disabled ? () => {} : onClick}
          disabled={disabled}
          type={submit ? 'submit' : 'button'}
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
