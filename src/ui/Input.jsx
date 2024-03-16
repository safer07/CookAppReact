export default function Input({
  value,
  onChange,
  placeholder,
  iconLeft,
  iconRight,
}) {
  return (
    <div className="input">
      {iconLeft && (
        <svg className="icon-left">
          <use href={`./images/icons.svg#${iconLeft}`} />
        </svg>
      )}
      <input
        className="textfield"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button className="clear-button" onClick={() => onChange("")}>
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
