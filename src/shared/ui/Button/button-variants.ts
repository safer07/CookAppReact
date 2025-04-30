import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'label-medium flex h-6 items-center justify-center gap-1 rounded-lg px-3 py-1 transition-all duration-300',
  {
    variants: {
      variant: {
        primary: null,
        secondary: null,
        tertiary: null,
        negative: null,
      },
      disabled: {
        false: null,
        true: 'surface-low border text-txt-tertiary border-base-borders cursor-not-allowed',
      },
      fullWidth: {
        false: null,
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: false,
        class: 'surface-accent shadow-md shadow-primary-highGradient hover:shadow-md-active',
      },
      {
        variant: 'secondary',
        disabled: false,
        class:
          'surface-default border border-primary text-primary shadow-primary-highGradient hover:text-primary-active hover:shadow-glow',
      },
      {
        variant: 'tertiary',
        disabled: false,
        class:
          'surface-default border border-base-borders text-txt-secondary shadow-primary-highGradient hover:border-primary hover:text-primary-active hover:shadow-glow',
      },
      {
        variant: 'negative',
        disabled: false,
        class: 'surface-red shadow-md shadow-red-highGradient hover:shadow-md-active',
      },
    ],
    defaultVariants: { variant: 'secondary', disabled: false, fullWidth: false },
  },
)
