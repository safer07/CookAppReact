import type { ListItemSize, ListItemStatus } from '../../ListItem/types'

export type SelectOption = {
  label: string
  value: string
  secondaryText?: string
  status?: ListItemStatus
  description?: string
}

type SelectBaseProps = {
  options: SelectOption[]
  placeholder?: string
  label?: string
  clearButton?: boolean
  optionSize?: ListItemSize
}

type SelectSingleProps = {
  multiple?: false
  value: string
  onChange: (value: string) => void
}

type SelectMultipleProps = {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

export type SelectProps = SelectBaseProps & (SelectSingleProps | SelectMultipleProps)

export type SelectRightIconsProps = {
  clearButton?: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} & (SelectSingleProps | SelectMultipleProps)

export type SelectOptionProps = {
  options: SelectOption[]
  optionSize?: ListItemSize
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  containerRef: React.RefObject<HTMLDivElement>
} & (SelectSingleProps | SelectMultipleProps)
