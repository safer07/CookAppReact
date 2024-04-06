type ListItemProps = {
  size?: string;
  text: string;
  secondaryText?: string;
  rightElement?: { element: string; icon: string };
};

export default function ListItem({
  size,
  text,
  secondaryText,
  rightElement,
}: ListItemProps) {
  return (
    <li className="flex items-center gap-2 px-[--body-padding-inline]">
      <span className={`${size === "tiny" ? "my-1" : "my-2"} flex grow`}>
        {text}
      </span>
      {secondaryText && (
        <span className="w-[4.5rem] text-right text-secondary-color">
          {secondaryText}
        </span>
      )}
      {rightElement?.element === "icon" && (
        <svg className="size-3">
          <use href={`/images/icons.svg#${rightElement?.icon}`} />
        </svg>
      )}
    </li>
  );
}
