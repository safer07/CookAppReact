import type { SelectRightIconsProps } from '../model/selectTypes'

export default function RightIcons({
  value,
  clearButton,
  multiple,
  onClickClear,
}: SelectRightIconsProps): React.JSX.Element {
  return (
    <div className="input-right-icons">
      <>
        {clearButton && value.length > 0 && (
          <button
            className="clear-button"
            onClick={event => {
              event.stopPropagation()
              onClickClear()
            }}
          >
            <svg>
              <use href="/images/icons.svg#cross" />
            </svg>
          </button>
        )}
        {(multiple || clearButton) && <span className="input-icons-divider" />}
      </>
      <svg className="icon-right">
        <use href="/images/icons.svg#chevron_down" />
      </svg>
    </div>
  )
}
