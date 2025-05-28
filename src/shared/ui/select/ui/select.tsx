import { useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib'

import Chip from '../../chip'
import type { SelectMultipleProps, SelectOption, SelectSingleProps } from '../model/select-types'
import Options from './options'
import RightIcons from './right-icons'

// export default function Select({
//   value,
//   options,
//   onChange,
//   placeholder,
//   label,
//   clearButton = true,
//   multiple = false,
//   className,
//   search = false,
//   optionSize = 'small',
// }: SelectSingleProps | SelectMultipleProps): React.JSX.Element {
export default function Select(props: SelectSingleProps | SelectMultipleProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const {
    value,
    options,
    onChange,
    placeholder,
    label,
    multiple,
    className,
    search = false,
    clearButton = true,
    optionSize = 'small',
  } = props
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options)

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

  const disabled: boolean = !options.some(option => option.disabled !== true)

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

  function getLabelByValue(value: string) {
    return options.find(option => option.value === value)?.label ?? value
  }

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLocaleLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredOptions(filtered)
  }, [searchValue, options])

  useEffect(() => {
    if (searchRef.current && isOpen) {
      searchRef.current.focus()
      setIsOpen(true)
    }
  }, [isOpen])

  return (
    <div className={className}>
      {label && <div className="input-label">{label}</div>}
      <div
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        className={cn('select', { open: isOpen, 'select-multiple': multiple && value.length > 0 })}
        onClick={onClick}
        onBlur={() => setIsOpen(false)}
        data-disabled={disabled}
      >
        {search && (value === '' || isOpen) ? (
          <input
            ref={searchRef}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="grow outline-none"
            type="search"
          />
        ) : multiple && value.length ? (
          <span className="chips-list">
            {value.map(item => (
              <Chip
                key={item}
                text={getLabelByValue(item)}
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
          // options={filteredOptions}
          // multiple={multiple}
          optionSize={optionSize}
          setIsOpen={setIsOpen}
          containerRef={containerRef}
          {...props}
          options={filteredOptions}
        />
      </div>
    </div>
  )
}
