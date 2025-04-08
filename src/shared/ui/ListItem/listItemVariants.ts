import { VariantProps, cva } from 'class-variance-authority'

export const listItemVariants = cva('listItem', {
  variants: {
    size: {
      tiny: 'min-h-4',
      small: 'min-h-5',
      medium: 'min-h-7',
    },
    _clickable: {
      false: null,
      true: 'hover:surface-accent-light cursor-pointer',
    },
    selected: {
      false: null,
      true: 'surface-accent-light [&_.right-icon]:text-primary',
    },
    disabled: {
      false: null,
      true: 'surface-low! text-txt-tertiary cursor-default! [&_:is(.list-item-secondary-text,_.list-item-description,_.right-icon)]:text-txt-tertiary',
    },
  },
  defaultVariants: { size: 'small', _clickable: false },
})

export type ListItemSize = Exclude<VariantProps<typeof listItemVariants>['size'], null | undefined>
