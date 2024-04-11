type ButtonIconProps = {
  icon: string;
  onClick: () => void;
  className?: string;
};

export default function ButtonIcon({
  icon,
  onClick,
  className,
}: ButtonIconProps) {
  return (
    <button className={`button-icon ${className}`} onClick={onClick}>
      <svg>
        <use href={`/images/icons.svg#${icon}`} />
      </svg>
    </button>
  );
}
