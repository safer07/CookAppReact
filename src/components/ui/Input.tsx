import { useRef, useState } from "react";

type InputProps = {
  onChange: (value: string) => void;
  onClear: (value: string) => void;
  placeholder?: string;
  iconLeft?: string;
  iconRight?: string;
};

export default function Input({
  onChange,
  onClear,
  placeholder,
  iconLeft,
  iconRight,
}: InputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function onClickClear() {
    setValue("");
    onChange("");
    onClear("");
    inputRef.current?.focus();
  }

  function onChangeInput(value: string) {
    setValue(value);
    onChange(value);
  }

  return (
    <div className="input">
      {iconLeft && (
        <svg className="icon-left">
          <use href={`/images/icons.svg#${iconLeft}`} />
        </svg>
      )}
      <input
        ref={inputRef}
        className="textfield"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChangeInput(event.target.value)}
      />
      {value && (
        <button className="clear-button" onClick={onClickClear}>
          <svg>
            <use href={`/images/icons.svg#cross`} />
          </svg>
        </button>
      )}
      {iconRight && (
        <svg className="icon-right">
          <use href={`/images/icons.svg#${iconRight}`} />
        </svg>
      )}
    </div>
  );
}
