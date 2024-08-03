export default function RightIcons({
  value,
  onChange,
  clearButton = true,
  multiple,
  setIsOpen,
}: SelectRightIconsProps): JSX.Element {
  function onClickClear(): void {
    if (multiple) onChange([]);
    multiple ? onChange([]) : onChange("");
    setIsOpen(false);
  }

  return (
    <div className="input-right-icons">
      <>
        {clearButton && value.length > 0 && (
          <button
            className="clear-button"
            onClick={(event) => {
              event.stopPropagation();
              onClickClear();
            }}
          >
            <svg>
              <use href="/images/icons.svg#cross" />
            </svg>
          </button>
        )}
        {(multiple || clearButton) && (
          <span className="input-icons-divider"></span>
        )}
      </>
      <svg className="icon-right">
        <use href="/images/icons.svg#chevron_down" />
      </svg>
    </div>
  );
}
