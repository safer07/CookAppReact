import Radio from "./Radio";

export enum ListItemElement {
  RADIO = "radio",
  ICON = "icon",
}

type RadioElem = {
  element: ListItemElement.RADIO;
  checked: boolean;
};

type IconElem = {
  element: ListItemElement.ICON;
  icon: string;
};

type ListItemProps = {
  size?: string;
  text: string;
  description?: string;
  secondaryText?: string;
  leftElement?: RadioElem;
  rightElement?: IconElem;
  onClick?: () => void;
};

export default function ListItem({
  size,
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

  return (
    <li
      className="flex items-center gap-2 px-[--body-padding-inline]"
      onClick={onClick}
    >
      {leftElement?.element === ListItemElement.RADIO && (
        <Radio checked={leftElement.checked} />
      )}
      <div className={`${contentMarginY} grow`}>
        <span className="block">{text}</span>
        <span className="block text-secondary-color">{description}</span>
      </div>
      {secondaryText && (
        <span className="w-[4.5rem] text-right text-secondary-color">
          {secondaryText}
        </span>
      )}
      {rightElement?.element === ListItemElement.ICON && (
        <svg className="size-3">
          <use href={`/images/icons.svg#${rightElement.icon}`} />
        </svg>
      )}
    </li>
  );
}
