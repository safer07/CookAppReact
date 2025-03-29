import { useRef, useState } from 'react'

import { cn } from '@/shared/lib'

import Chip from '../../Chip'
import type { SelectMultipleProps, SelectSingleProps } from '../model/types'
import Options from './Options'
import RightIcons from './RightIcons'

// export default function Select({
//   value,
//   options,
//   onChange,
//   placeholder,
//   label,
//   clearButton = true,
//   multiple = false,
//   optionSize = "small",
// }: SelectSingleProps | SelectMultipleProps): React.JSX.Element {
export default function Select(props: SelectSingleProps | SelectMultipleProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    value,
    options,
    onChange,
    placeholder,
    label,
    multiple,
    clearButton = true,
    optionSize = 'small',
  } = props

  // const isMultiple = ((
  //   props: SelectSingleProps | SelectMultipleProps,
  // ): props is SelectMultipleProps => props.multiple === true)(props)

  // const isMultiple = ((
  //   value: string | string[],
  // ): value is string[] => Array.isArray(value))(value)

  // if (multiple) {
  //   value
  // }

  // if (isMultiple) {
  //   value
  //   props.value
  //   props.onChange
  // }

  let valueLabel: string | null = null
  if (typeof value === 'string' && value !== '') {
    valueLabel = options.find(option => option.value === value)?.label || null
  }

  let disabled: boolean = false
  const hasAvailableOptions = options.some((option): boolean => option.status !== 'disabled')
  if (!hasAvailableOptions) disabled = true

  function onClick(): void {
    if (!disabled) setIsOpen(prev => !prev)
  }

  function onChipClick(event: React.MouseEvent<HTMLElement, MouseEvent>, chipValue: string): void {
    event.stopPropagation()
    if (multiple) {
      const filteredValue: string[] = value.filter(item => item !== chipValue)
      onChange(filteredValue)
    }
  }

  function onClickClear(): void {
    if (multiple) onChange([])
    else onChange('')
    setIsOpen(false)
  }

  return (
    <div>
      {label && <div className="input-label">{label}</div>}
      <div
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        className={cn('select', { open: isOpen, 'select-multiple': multiple && value.length > 0 })}
        onClick={onClick}
        onBlur={() => setIsOpen(false)}
        data-disabled={disabled}
      >
        {multiple && value.length ? (
          <span className="chips-list">
            {value.map(item => (
              <Chip
                key={item}
                text={item}
                variant="active"
                onClick={event => onChipClick(event, item)}
                del
              />
            ))}
          </span>
        ) : (
          <span className={cn('textfield', { placeholder: value.length === 0 })}>
            {value.length > 0 ? valueLabel : placeholder}
          </span>
        )}

        <RightIcons
          value={value}
          clearButton={clearButton}
          multiple={multiple}
          onClickClear={onClickClear}
          setIsOpen={setIsOpen}
        />

        <Options
          // value={value}
          // onChange={onChange}
          // options={options}
          // multiple={multiple}
          optionSize={optionSize}
          setIsOpen={setIsOpen}
          containerRef={containerRef}
          {...props}
        />
      </div>
    </div>
  )
}
