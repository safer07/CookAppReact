import type { ListItemSize } from '../../ListItem'

export type SelectOption = {
  label: string
  value: string
  secondaryText?: string
  selected?: boolean
  disabled?: boolean
  description?: string
}

type SelectBaseProps = {
  options: SelectOption[]
  placeholder?: string
  label?: string
  clearButton?: boolean
  optionSize?: ListItemSize
  className?: string
}

export type SelectSingleProps = {
  multiple?: false
  value: string
  onChange: (value: string) => void
} & SelectBaseProps

export type SelectMultipleProps = {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
} & SelectBaseProps

export type SelectRightIconsProps = {
  clearButton: boolean
  onClickClear: () => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} & Pick<SelectSingleProps | SelectMultipleProps, 'multiple' | 'value'>

export type SelectOptionProps = {
  options: SelectOption[]
  optionSize: ListItemSize
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  containerRef: React.RefObject<HTMLDivElement | null>
} & (SelectSingleProps | SelectMultipleProps)
