export default function Button({
  text,
  icon,
  onClick,
  className,
  type,
  block,
}) {
  let typeSlyle;

  switch (type) {
    case "primary":
      typeSlyle = "button-primary";
      break;
    default:
      typeSlyle = "button-secondary";
  }

  return (
    <button
      className={`button ${typeSlyle} ${className} ${block ? "w-full" : ""}`}
      onClick={onClick}
    >
      {icon && (
        <svg>
          <use href={icon} />
        </svg>
      )}
      {text}
    </button>
  );
}
