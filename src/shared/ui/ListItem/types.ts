type RadioElem = {
  element: "radio";
  checked: boolean;
};

type SwitchElem = {
  element: "switch";
  checked: boolean;
  onClick: () => void;
};

type IconElem = {
  element: "icon";
  icon: string;
};

type EmptyIconElem = {
  element: "emptyIcon";
};

type DeleteElem = {
  element: "delete";
  onClick?: () => void;
};

type ListItemSize = "tiny" | "small" | "medium";
type ListItemStatus = "disabled" | "selected" | "";
type ListItemRightElem = IconElem | DeleteElem | EmptyIconElem;

type ListItemProps = {
  size?: ListItemSize;
  text: string;
  description?: string;
  secondaryText?: string;
  leftElement?: RadioElem | SwitchElem;
  rightElement?: ListItemRightElem;
  onClick?: () => void;
  status?: ListItemStatus;
};
