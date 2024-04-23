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

type ListItemStatus = "disabled" | "selected" | "";

type ListItemProps = {
  size?: "tiny" | "small" | "medium";
  text: string;
  description?: string;
  secondaryText?: string;
  leftElement?: RadioElem | SwitchElem;
  rightElement?: IconElem | DeleteElem | EmptyIconElem;
  onClick?: () => void;
  status?: ListItemStatus;
};
