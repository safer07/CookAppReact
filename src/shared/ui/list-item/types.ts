import { VariantProps } from 'class-variance-authority'

import { listItemVariants } from './list-item-variants'

type RadioElem = {
  element: 'radio'
  checked: boolean
}

type SwitchElem = {
  element: 'switch'
  checked: boolean
  onClick: () => void
}

type IconElem = {
  element: 'icon'
  icon: string
  className?: string
}

type EmptyIconElem = {
  element: 'emptyIcon'
}

type DeleteElem = {
  element: 'delete'
  onClick?: () => void
}

export type ListItemRightElem = IconElem | DeleteElem | EmptyIconElem

export type ListItemProps = {
  text: string
  description?: string
  secondaryText?: string
  leftElement?: RadioElem | SwitchElem | IconElem
  rightElement?: ListItemRightElem
  onClick?: () => void
} & Omit<VariantProps<typeof listItemVariants>, '_clickable'>
