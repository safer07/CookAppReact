import { Link } from 'react-router-dom'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '../../lib'
import { buttonVariants } from './buttonVariants'

type BaseProps = {
  text: string
  icon?: string
  className?: string
} & VariantProps<typeof buttonVariants>

type LinkProps = {
  link: string
  state?: object
} & BaseProps

type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  link?: never
  loading?: boolean
} & BaseProps

function ButtonIcon({ icon, className }: { icon: string; className?: string }) {
  return (
    <svg className={cn('size-3', className)} aria-hidden="true">
      <use href={`/images/icons.svg#${icon}`} />
    </svg>
  )
}

export default function Button(props: ButtonProps | LinkProps) {
  const { text, icon, className, variant, fullWidth } = props
  const disabled = props.disabled ?? undefined
  let link, onClick, type, loading, state
  if (props?.link !== undefined) {
    link = props.link
    state = props.state
  } else {
    onClick = props.onClick
    type = props.type || 'button'
    loading = props.loading
  }

  return (
    <>
      {link ? (
        <Link
          to={link}
          className={cn(buttonVariants({ variant, disabled, fullWidth }), className)}
          state={state}
        >
          {icon && <ButtonIcon icon={icon} />}
          <span className="truncate">{text}</span>
        </Link>
      ) : (
        <button
          className={cn(buttonVariants({ variant, disabled, fullWidth }), className)}
          onClick={disabled ? () => {} : onClick}
          disabled={disabled}
          type={type}
        >
          {icon && !loading && <ButtonIcon icon={icon} />}
          {loading && <ButtonIcon className="animate-spin" icon="loader" />}
          <span className="truncate">{loading ? 'Загрузка...' : text}</span>
        </button>
      )}
    </>
  )
}
