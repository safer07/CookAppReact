import { useRef, useState } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  iconLeft?: string;
  iconRight?: string;
  label?: string;
  helper?: string;
  showCount?: boolean;
  maxLength?: number;
  clearButton?: boolean;
};

export default function Input({
  value,
  onChange,
  placeholder,
  iconLeft,
  iconRight,
  label,
  helper,
  showCount,
  maxLength,
  clearButton,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onClickClear() {
    onChange("");
    inputRef.current?.focus();
  }

  return (
    <div>
      {label && <div className="input-label">{label}</div>}
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
          maxLength={maxLength}
        />
        {value && clearButton && (
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
  );
}
