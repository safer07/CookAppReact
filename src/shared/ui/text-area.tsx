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

type TextAreaProps = {
  placeholder?: string
  label?: string
  helper?: string
  showCount?: boolean
  maxLength?: number
  className?: string
  defaultValue?: string
} & (ControlledInput | UncontrolledInput)

export default function TextArea({
  value,
  onChange,
  placeholder,
  label,
  helper,
  showCount,
  maxLength,
  className,
  ...rest
}: TextAreaProps) {
  return (
    <div className={className}>
      {label && <div className="input-label">{label}</div>}
      <textarea
        className="textarea"
        value={value}
        placeholder={placeholder}
        onChange={onChange ? event => onChange(event.target.value) : undefined}
        maxLength={maxLength}
        rows={5}
        {...rest}
      />
      {(helper || showCount) && (
        <div className="input-helper-block">
          {helper && <div className="input-helper">{helper}</div>}
          {showCount && (
            <div className="input-right-helper">
              {value?.length ?? 0} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
