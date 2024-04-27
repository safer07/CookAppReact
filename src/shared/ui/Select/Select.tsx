import { useRef, useState } from "react";

import Chip from "../Chip";
import ListItem from "../ListItem";

// {
//   value,
//   options,
//   onChange,
//   placeholder,
//   disabled,
//   label,
//   clearButton = true,
//   multiple = false,
//   optionSize = "small",
// }

export default function Select(props: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Все props
  //   const {
  //   value,
  //   options,
  //   onChange,
  //   placeholder,
  //   disabled,
  //   label,
  //   clearButton = true,
  //   multiple = false,
  //   optionSize = "small",
  // } = props

  const {
    value,
    options,
    onChange,
    placeholder,
    label,
    clearButton = true,
    multiple,
    optionSize = "small",
  } = props;

  let { disabled } = props;
  // const {multiple = false} = props;

  // if (multiple) {
  //   value;
  // }

  let valueLabel: string | null = null;
  if (typeof value === "string" && value !== "") {
    valueLabel =
      options.find((option) => option.value === value)?.label || null;
  }

  const hasAvailableOptions = options.some(
    (option): boolean => option.status !== "disabled",
  );

  if (!hasAvailableOptions) disabled = true;

  function onClick(): void {
    if (!disabled) setIsOpen((prev) => !prev);
  }

  function onChipClick(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    chipValue: string,
  ): void {
    event.stopPropagation();
    if (multiple) {
      const filteredValue: string[] = value.filter(
        (item) => item !== chipValue,
      );
      onChange(filteredValue);
    }
  }

  function selectOption(optionValue: string): void {
    if (multiple) {
      if (!value.includes(optionValue)) {
        onChange([...value, optionValue]);
      } else {
        onChange(value.filter((o) => o !== optionValue));
      }
    } else {
      containerRef.current!.blur();
      if (optionValue !== value) onChange(optionValue);
    }
  }

  function isSelectedOption(optionValue: string): boolean {
    if (multiple) return value.includes(optionValue);
    else return optionValue === value;
  }

  function onClickClear(): void {
    multiple ? onChange([]) : onChange("");
    setIsOpen(false);
  }

  function onOptionClick(value: string): void {
    selectOption(value);
    if (!multiple) setIsOpen(false);
  }

  return (
    <div>
      {label && <div className="input-label">{label}</div>}
      <div
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        className={`select ${isOpen ? "open" : ""} ${multiple && value.length > 0 ? "select-multiple" : ""}`}
        onClick={onClick}
        onBlur={() => setIsOpen(false)}
        data-disabled={disabled}
      >
        {multiple && value.length ? (
          <span className="chips-list">
            {value.map((item) => (
              <Chip
                key={item}
                text={item}
                variant="active"
                onClick={(event) => onChipClick(event, item)}
                del
              />
            ))}
          </span>
        ) : (
          <span
            className={`textfield ${value.length > 0 ? "" : "placeholder"}`}
          >
            {value.length > 0 ? valueLabel : placeholder}
          </span>
        )}

        <div className="input-right-icons">
          <>
            {clearButton && value.length > 0 && (
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
            )}
            {(multiple || clearButton) && (
              <span className="input-icons-divider"></span>
            )}
          </>
          <svg className="icon-right">
            <use href="/images/icons.svg#chevron_down" />
          </svg>
        </div>

        {/* <RightIcons
          value={value}
          onChange={onChange}
          clearButton={props.clearButton}
          multiple={multiple}
          setIsOpen={setIsOpen}
        /> */}

        {/* <Options
          value={props.value}
          options={props.options}
          multiple={props.multiple}
          optionSize={props.optionSize}
          onOptionClick={onOptionClick}
        /> */}

        <ul className="select-options">
          {options.map((option) => {
            let optionStatus: ListItemStatus = "";
            let rightElement: ListItemRightElem | undefined;

            if (option.status === "disabled") optionStatus = "disabled";
            else if (isSelectedOption(option.value)) optionStatus = "selected";

            if (multiple) {
              const rightElementType =
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

              rightElement = {
                element: rightElementType,
                icon: rightElementIcon,
              };
            }

            return (
              <ListItem
                key={option.value}
                text={option.label}
                description={option.description}
                secondaryText={option.secondaryText}
                size={`${option.description ? "medium" : optionSize}`}
                onClick={() => onOptionClick(option.value)}
                status={optionStatus}
                rightElement={rightElement}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
