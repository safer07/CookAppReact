import { useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  clearButton?: boolean;
};

export default function Select({
  value,
  options,
  onChange,
  placeholder,
  disabled,
  label,
  clearButton = true,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const valueLabel = value
    ? options.find((option) => option.value === value)?.label
    : null;

  if (!options.length) disabled = true;

  function onClick() {
    if (!disabled) setIsOpen((prev) => !prev);
  }

  function onClickClear() {
    onChange("");
    setIsOpen(false);
  }

  function selectOption(optionValue: string) {
    containerRef.current!.blur();
    if (optionValue !== value) onChange(optionValue);
  }

  function isSelectedOption(optionValue: string) {
    return optionValue === value;
  }

  return (
    <div>
      {label && <div className="input-label">{label}</div>}
      <div
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        className={`select ${isOpen ? "open" : ""}`}
        onClick={onClick}
        onBlur={() => setIsOpen(false)}
        data-disabled={disabled}
      >
        <span className={`textfield ${value ? "" : "placeholder"}`}>
          {value ? valueLabel : placeholder}
        </span>

        <div className="input-right-icons">
          {value && clearButton && (
            <>
              <button
                className="clear-button"
                onClick={(event) => {
                  event.stopPropagation();
                  onClickClear();
                }}
              >
                <svg>
                  <use href="/images/icons.svg#cross" />
                </svg>
              </button>
              <span className="input-icons-divider"></span>
            </>
          )}
          <svg className="icon-right">
            <use href={`/images/icons.svg#chevron_down`} />
          </svg>
        </div>

        <ul className="select-options">
          {options.map((option) => (
            <li
              onClick={(event) => {
                event.stopPropagation();
                selectOption(option.value);
                setIsOpen(false);
              }}
              key={option.value}
              className={`option ${isSelectedOption(option.value) ? "selected" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
