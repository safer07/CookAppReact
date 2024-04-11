import { useRef, useState } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  iconLeft?: string;
  iconRight?: string;
};

export default function Input({
  value,
  onChange,
  placeholder,
  iconLeft,
  iconRight,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onClickClear() {
    onChange("");
    inputRef.current?.focus();
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
        onChange={(event) => onChange(event.target.value)}
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
