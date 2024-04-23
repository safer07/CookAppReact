type SelectOption = {
  label: string;
  value: string;
  secondaryText?: string;
  status?: ListItemStatus;
  description?: string;
};

type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  clearButton?: boolean;
};
