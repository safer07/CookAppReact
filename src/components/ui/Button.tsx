export enum ButtonType {
  PRIMARY = "button-primary",
  SECONDARY = "button-secondary",
}

type ButtonProps = {
  text: string;
  icon?: string;
  onClick: () => void;
  className?: string;
  type?: ButtonType;
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
  return (
    <button
      className={`button ${type || "button-secondary"} ${className} ${block ? "w-full" : ""}`}
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
