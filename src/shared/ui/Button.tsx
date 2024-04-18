export enum ButtonType {
  PRIMARY = "button-primary",
  SECONDARY = "button-secondary",
  TERTIARY = "button-tertiary",
  NEGATIVE = "button-negative",
}

type ButtonProps = {
  text: string;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: ButtonType;
  block?: boolean;
};

export default function Button({
  text,
  icon,
  onClick,
  disabled,
  className = "",
  type,
  block,
}: ButtonProps) {
  return (
    <button
      className={`button ${type || "button-secondary"} ${className} ${block ? "w-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <svg>
          <use href={`/images/icons.svg#${icon}`} />
        </svg>
      )}
      <span>{text}</span>
    </button>
  );
}
