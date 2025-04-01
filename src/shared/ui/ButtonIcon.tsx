import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '../lib'

type ButtonIconProps = {
  icon: string
  onClick: () => void
  className?: string
  badge?: number
} & VariantProps<typeof buttonIconVariants>

const buttonIconVariants = cva(
  'relative grid shrink-0 place-content-center transition-colors duration-300',
  {
    variants: {
      variant: {
        primary: null,
        tertiary:
          'surface-default border border-base-borders shadow-primary-active hover:border-primary hover:text-primary-active hover:shadow-glow',
        ghost: 'surface-default hover:text-primary-active',
      },
      size: {
        small: 'size-5',
        medium: 'size-6',
      },
      square: {
        false: 'rounded-full',
        true: 'rounded-lg',
      },
    },
    defaultVariants: { variant: 'ghost', size: 'medium', square: false },
  },
)

export default function ButtonIcon({
  icon,
  onClick,
  className,
  variant,
  size,
  square,
  badge,
}: ButtonIconProps) {
  return (
    <button
      className={cn(buttonIconVariants({ variant, size, square }), className)}
      onClick={onClick}
      // TODO: aria-label
      aria-label={icon}
      type="button"
    >
      <svg className="size-3" aria-hidden="true">
        <use href={`/images/icons.svg#${icon}`} />
      </svg>
      {badge !== 0 && (
        <span className="surface-accent-secondary absolute top-0.5 right-0.5 rounded-full px-0.5 text-right text-[0.625rem] leading-[0.875rem]">
          {badge}
        </span>
      )}
    </button>
  )
}
