type ButtonProps = {
  text: string
  icon?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'negative'
  block?: boolean
  submit?: boolean
}

export default function Button({
  text,
  icon,
  onClick,
  disabled,
  className = '',
  variant,
  block,
  submit,
}: ButtonProps) {
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
  )
}
