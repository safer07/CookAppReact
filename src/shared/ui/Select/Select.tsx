import { useRef, useState } from "react";

import ListItem from "../ListItem";

export default function Select({
  value,
  options,
  onChange,
  placeholder,
  disabled,
  label,
  clearButton = true,
}: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const valueLabel: string | null = value
    ? options.find((option) => option.value === value)?.label || null
    : null;

  const hasAvailableOptions = options.some(
    (option): boolean => option.status !== "disabled",
  );

  if (!hasAvailableOptions) disabled = true;

  function onClick(): void {
    if (!disabled) setIsOpen((prev) => !prev);
  }

  function onClickClear(): void {
    onChange("");
    setIsOpen(false);
  }

  function selectOption(optionValue: string): void {
    containerRef.current!.blur();
    if (optionValue !== value) onChange(optionValue);
  }

  function isSelectedOption(optionValue: string): boolean {
    return optionValue === value;
  }

  function onOptionClick(value: string): void {
    selectOption(value);
    setIsOpen(false);
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
            <use href="/images/icons.svg#chevron_down" />
          </svg>
        </div>

        <ul className="select-options">
          {options.map((option) => {
            let optionStatus: ListItemStatus = "";

            if (option.status === "disabled") optionStatus = "disabled";
            else if (isSelectedOption(option.value)) optionStatus = "selected";

            const rightElement =
              optionStatus === "disabled" || optionStatus === "selected"
                ? "icon"
                : "emptyIcon";

            const rightElementIcon = (() => {
              switch (optionStatus) {
                case "disabled":
                  return "cross_small";
                case "selected":
                  return "check";
                case "":
                default:
                  return "dash";
              }
            })();

            return (
              <ListItem
                key={option.value}
                text={option.label}
                description={option.description}
                secondaryText={option.secondaryText}
                size="medium"
                onClick={() => onOptionClick(option.value)}
                status={optionStatus}
                rightElement={{ element: rightElement, icon: rightElementIcon }}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
