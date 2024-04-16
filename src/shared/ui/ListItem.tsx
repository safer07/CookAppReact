import Radio from "./Radio";

type RadioElem = {
  element: "radio";
  checked: boolean;
};

type IconElem = {
  element: "icon";
  icon: string;
};

type DeleteElem = {
  element: "delete";
  onClick?: () => void;
};

type ListItemProps = {
  size?: "tiny" | "small" | "medium";
  text: string;
  description?: string;
  secondaryText?: string;
  leftElement?: RadioElem;
  rightElement?: IconElem | DeleteElem;
  onClick?: () => void;
};

export default function ListItem({
  size = "small",
  text,
  description,
  secondaryText,
  leftElement,
  rightElement,
  onClick,
}: ListItemProps) {
  let contentMarginY;
  if (size === "tiny") contentMarginY = "my-1";
  else if (description) contentMarginY = "my-0.75";
  else contentMarginY = "my-2";

  let minHeight;
  if (size === "tiny") minHeight = "min-h-4";
  else if (size === "small") minHeight = "min-h-5";
  else minHeight = "min-h-7";

  return (
    <li
      className={`flex items-center gap-2 px-[--body-padding-inline] ${minHeight}`}
      onClick={onClick}
    >
      {leftElement?.element === "radio" && (
        <Radio checked={leftElement.checked} />
      )}
      <div className={`grow`}>
        <span className="line-clamp-2">{text}</span>
        <span className="block text-secondary-color">{description}</span>
      </div>
      {secondaryText && (
        <span className="w-[4.5rem] shrink-0 text-right text-secondary-color">
          {secondaryText}
        </span>
      )}
      {rightElement?.element === "icon" && (
        <svg className="size-3">
          <use href={`/images/icons.svg#${rightElement.icon}`} />
        </svg>
      )}
      {rightElement?.element === "delete" && (
        <button className="text-tertiary-color" onClick={rightElement.onClick}>
          <svg className="size-3">
            <use href="/images/icons.svg#cross" />
          </svg>
        </button>
      )}
    </li>
  );
}
