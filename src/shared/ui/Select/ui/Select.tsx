import { useRef, useState } from "react";

import Chip from "../../Chip";
import RightIcons from "./RightIcons";
import Options from "./Options";

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

  const { value, options, onChange, placeholder, label, multiple } = props;
  let disabled: boolean = false;

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

        <RightIcons
          // value={props.value}
          // onChange={props.onChange}
          // clearButton={props.clearButton}
          // multiple={props.multiple}
          setIsOpen={setIsOpen}
          {...props}
        />

        <Options
          // value={props.value}
          // options={props.options}
          // multiple={props.multiple}
          // optionSize={props.optionSize}
          setIsOpen={setIsOpen}
          containerRef={containerRef}
          {...props}
        />
      </div>
    </div>
  );
}
