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
} & BaseProps

export default function Button(props: ButtonProps | LinkProps) {
  const { text, icon, className = '', variant, block } = props
  let link, onClick, disabled, submit
  if (props?.link !== undefined) {
    link = props.link
  } else {
    onClick = props.onClick
    disabled = props.disabled
    submit = props.submit
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
          onClick={onClick}
          disabled={disabled}
          type={submit ? 'submit' : 'button'}
        >
          {icon && (
            <svg>
              <use href={`/images/icons.svg#${icon}`} />
            </svg>
          )}
          <span>{text}</span>
        </button>
      )}
    </>
  )
}
