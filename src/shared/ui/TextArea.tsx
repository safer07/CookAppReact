type TextAreaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  helper?: string
  showCount?: boolean
  maxLength?: number
  className?: string
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  label,
  helper,
  showCount,
  maxLength,
  className,
}: TextAreaProps) {
  return (
    <div className={className}>
      {label && <div className="input-label">{label}</div>}
      <textarea
        className="textarea"
        value={value}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        maxLength={maxLength}
        rows={5}
      />
      {(helper || showCount) && (
        <div className="input-helper-block">
          {helper && <div className="input-helper">{helper}</div>}
          {showCount && (
            <div className="input-right-helper">
              {value.length} / {maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
