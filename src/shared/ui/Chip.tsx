type ChipProps = {
  text: string;
  onClick?: () => void;
  variant?: "active";
  del?: boolean;
};

export default function Chip({
  text,
  onClick,
  variant,
  del = false,
}: ChipProps) {
  return (
    <span
      className={`chip ${variant === "active" && "active"} ${del && "chip-delete"}`}
      onClick={onClick}
    >
      {text}
      {del && (
        <svg>
          <use href="/images/icons.svg#cross"></use>
        </svg>
      )}
    </span>
  );
}
