import { useRef } from 'react'

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
} & (InputTextProps | InputNumberProps)

type InputTextProps = {
  type?: 'text' | 'search' | 'email' | 'password'
  showCount?: boolean
  maxLength?: number
  min?: never
}

type InputNumberProps = {
  type: 'number'
  showCount?: never
  maxLength?: never
  min?: string
}

export default function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
  className = '',
  iconLeft,
  iconRight,
  label,
  helper,
  showCount,
  maxLength,
  clearButton,
  name,
  min,
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  function onClickClear() {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className={className}>
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
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          maxLength={maxLength}
          min={min}
          autoComplete="off"
          name={name}
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
                {clearButton && iconRight && (
                  <span className="input-icons-divider"></span>
                )}
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
