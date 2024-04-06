type ButtonProps = {
  text: string;
  icon?: string;
  onClick: () => void;
  className?: string;
  type?: string;
  block?: boolean;
};

export default function Button({
  text,
  icon,
  onClick,
  className,
  type,
  block,
}: ButtonProps) {
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
          <use href={`/images/icons.svg#${icon}`} />
        </svg>
      )}
      {text}
    </button>
  );
}
