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

export type ListItemSize = 'tiny' | 'small' | 'medium'
export type ListItemStatus = 'disabled' | 'selected' | ''
export type ListItemRightElem = IconElem | DeleteElem | EmptyIconElem

export type ListItemProps = {
  size?: ListItemSize
  text: string
  description?: string
  secondaryText?: string
  leftElement?: RadioElem | SwitchElem | IconElem
  rightElement?: ListItemRightElem
  onClick?: () => void
  status?: ListItemStatus
}
