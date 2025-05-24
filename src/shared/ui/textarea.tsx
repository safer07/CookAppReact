import { useRef, useState } from 'react'

type ControlledInput = {
  value: string
  onChange: (value: string) => void
  name?: string
}

type UncontrolledInput = {
  value?: never
  onChange?: never
  name: string
}

type TextareaProps = {
  placeholder?: string
  label?: string
  helper?: string
  showCount?: boolean
  maxLength?: number
  className?: string
  defaultValue?: string
} & (ControlledInput | UncontrolledInput)

export default function Textarea({
  value,
  onChange,
  placeholder,
  label,
  helper,
  showCount,
  maxLength,
  className,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [inputLength, setInputLength] = useState(textareaRef.current?.value.length ?? 0)

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    setInputLength(value.length)
    if (onChange) onChange(value)
  }

  return (
    <div className={className}>
      {label && <div className="input-label">{label}</div>}
      <textarea
        ref={textareaRef}
        className="textarea"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        rows={5}
        {...rest}
      />
      {(helper || showCount) && (
        <div className="input-helper-block">
          {helper && <div className="input-helper">{helper}</div>}
          {showCount && (
            <div className="input-right-helper">
              {inputLength} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
