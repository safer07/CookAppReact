type SelectOption = {
  label: string;
  value: string;
  secondaryText?: string;
  status?: ListItemStatus;
  description?: string;
};

type SelectBaseProps = {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  clearButton?: boolean;
  optionSize?: ListItemSize;
};

type SelectSingleProps = {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type SelectMultipleProps = {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SelectProps = SelectBaseProps & (SelectSingleProps | SelectMultipleProps);
