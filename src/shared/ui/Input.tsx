import { useRef } from 'react'

import { cn } from '../lib'

type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  iconLeft?: string
  iconRight?: string
  label?: string
  helper?: string
  clearButton?: boolean
  name?: string
} & (InputTextProps | InputDateProps | InputNumberProps)

// TODO: есть ли вариант сделать это без never?
type InputTextProps = {
  type?: 'text' | 'search' | 'email' | 'password'
  showCount?: boolean
  maxLength?: number
}

type InputDateProps = {
  type: 'date'
  showCount?: never
  maxLength?: never
  min?: string
  max?: string
}

type InputNumberProps = {
  type: 'number'
  showCount?: never
  maxLength?: never
  min?: string
  max?: string
}

export default function Input({
  value,
  onChange,
  type = 'text',
  className,
  iconLeft,
  iconRight,
  label,
  helper,
  showCount,
  maxLength,
  clearButton,
  ...rest
}: InputProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  function onClickClear() {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn(className)}>
      {label && <div className="input-label">{label}</div>}

      <div className="input">
        {iconLeft && (
          <svg className="icon-left">
            <use href={`/images/icons.svg#${iconLeft}`} />
          </svg>
        )}

        <input
          ref={inputRef}
          className="textfield"
          type={type}
          value={value}
          onChange={event => onChange(event.target.value)}
          maxLength={maxLength}
          autoComplete="off"
          {...rest}
        />

        {(clearButton || iconRight) && (
          <div className="input-right-icons">
            {value && clearButton && (
              <>
                {value && clearButton && (
                  <button className="clear-button" onClick={onClickClear}>
                    <svg>
                      <use href="/images/icons.svg#cross" />
                    </svg>
                  </button>
                )}
                {clearButton && iconRight && <span className="input-icons-divider" />}
              </>
            )}
            {iconRight && (
              <svg className="icon-right">
                <use href={`/images/icons.svg#${iconRight}`} />
              </svg>
            )}
          </div>
        )}
      </div>

      {(helper || showCount) && (
        <div className="input-helper-block">
          {helper && <div className="input-helper">{helper}</div>}
          <div className="input-right-helper">
            {value.length} / {maxLength}
          </div>
        </div>
      )}
    </div>
  )
}
