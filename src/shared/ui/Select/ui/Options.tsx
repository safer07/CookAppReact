import ListItem from '../../ListItem'
import type { ListItemRightElem } from '../../ListItem'
import type { SelectOptionProps } from '../model/selectTypes'

export default function Options(props: SelectOptionProps): React.JSX.Element {
  const { value, onChange, options, multiple, optionSize, setIsOpen, containerRef } = props

  function isSelectedOption(optionValue: string): boolean {
    if (multiple) return value.includes(optionValue)
    else return optionValue === value
  }

  function selectOption(optionValue: string): void {
    if (multiple) {
      if (!value.includes(optionValue)) {
        onChange([...value, optionValue])
      } else {
        onChange(value.filter(o => o !== optionValue))
      }
    } else {
      containerRef.current!.blur()
      if (optionValue !== value) onChange(optionValue)
    }
  }

  function onOptionClick(value: string): void {
    selectOption(value)
    if (!multiple) setIsOpen(false)
  }

  return (
    <ul className="select-options">
      {options.map(option => {
        const disabled = option.disabled
        const selected = isSelectedOption(option.value)
        let rightElement: ListItemRightElem | undefined

        if (multiple) {
          const rightElementType = disabled || selected ? 'icon' : 'emptyIcon'

          const rightElementIcon = (() => {
            if (disabled) return 'cross_small'
            else if (selected) return 'check'
            return 'dash'
          })()

          rightElement = {
            element: rightElementType,
            icon: rightElementIcon,
          }
        }

        return (
          <ListItem
            key={option.value}
            text={option.label}
            description={option.description}
            secondaryText={option.secondaryText}
            size={`${option.description ? 'medium' : optionSize}`}
            onClick={() => onOptionClick(option.value)}
            disabled={disabled}
            selected={selected}
            rightElement={rightElement}
          />
        )
      })}
    </ul>
  )
}
