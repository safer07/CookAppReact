import { useRef, useState } from "react";

export default function Input({
  onChange,
  onClear,
  placeholder,
  iconLeft,
  iconRight,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  function onClickClear() {
    setValue("");
    onChange("");
    onClear("");
    inputRef.current.focus();
  }

  function onChangeInput(value) {
    setValue(value);
    onChange(value);
  }

  return (
    <div className="input">
      {iconLeft && (
        <svg className="icon-left">
          <use href={`./images/icons.svg#${iconLeft}`} />
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
            <use href={`./images/icons.svg#cross`} />
          </svg>
        </button>
      )}
      {iconRight && (
        <svg className="icon-right">
          <use href={`./images/icons.svg#${iconRight}`} />
        </svg>
      )}
    </div>
  );
}
