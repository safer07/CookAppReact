import ListItem from '../../ListItem'

export default function Options({
  value,
  onChange,
  options,
  multiple,
  optionSize = 'small',
  setIsOpen,
  containerRef,
}: SelectOptionProps): React.JSX.Element {
  function isSelectedOption(optionValue: string): boolean {
    if (multiple) return value.includes(optionValue)
    else return optionValue === value
  }

  function selectOption(optionValue: string): void {
    if (multiple) {
      if (!value.includes(optionValue)) {
        onChange([...value, optionValue])
      } else {
        onChange(value.filter((o) => o !== optionValue))
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
      {options.map((option) => {
        let optionStatus: ListItemStatus = ''
        let rightElement: ListItemRightElem | undefined

        if (option.status === 'disabled') optionStatus = 'disabled'
        else if (isSelectedOption(option.value)) optionStatus = 'selected'

        if (multiple) {
          const rightElementType =
            optionStatus === 'disabled' || optionStatus === 'selected' ? 'icon' : 'emptyIcon'

          const rightElementIcon = (() => {
            switch (optionStatus) {
              case 'disabled':
                return 'cross_small'
              case 'selected':
                return 'check'
              case '':
              default:
                return 'dash'
            }
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
            status={optionStatus}
            rightElement={rightElement}
          />
        )
      })}
    </ul>
  )
}
