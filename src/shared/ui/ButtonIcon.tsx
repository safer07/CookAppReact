type ButtonIconProps = {
  icon: string;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "tertiary" | "ghost";
  size?: "small" | "medium";
};

export default function ButtonIcon({
  icon,
  onClick,
  className = "",
  variant = "ghost",
  size = "medium",
}: ButtonIconProps) {
  const variantClass = (() => {
    switch (variant) {
      case "primary":
        return "button-icon-primary";
      case "tertiary":
        return "button-icon-tertiary";
      case "ghost":
        return "button-icon-ghost";
      default:
        return "";
    }
  })();

  return (
    <button
      className={`button-icon ${className} ${variantClass} ${size === "medium" ? "button-icon-medium" : "button-icon-small"}`}
      onClick={onClick}
    >
      <svg>
        <use href={`/images/icons.svg#${icon}`} />
      </svg>
    </button>
  );
}
