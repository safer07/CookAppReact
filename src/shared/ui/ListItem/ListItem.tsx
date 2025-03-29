import { cn } from '@/shared/lib'

import Radio from '../Radio'
import Switch from '../Switch'
import type { ListItemProps, ListItemStatus } from './types'

export default function ListItem({
  size = 'small',
  text,
  description,
  secondaryText,
  leftElement,
  rightElement,
  onClick = () => {},
  status,
}: ListItemProps) {
  function onItemClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    event.stopPropagation()
    if (status === 'disabled') return
    onClick()
  }

  const sizeClass = (() => {
    switch (size) {
      case 'tiny':
        return 'list-item-tiny'
      case 'small':
        return 'list-item-small'
      case 'medium':
      default:
        return ''
    }
  })()

  const statusClass: ListItemStatus = (() => {
    switch (status) {
      case 'selected':
        return 'selected'
      case 'disabled':
        return 'disabled'
      default:
        return ''
    }
  })()

  return (
    <li className={`listItem ${sizeClass} ${statusClass}`} onClick={event => onItemClick(event)}>
      {leftElement?.element === 'radio' && <Radio checked={leftElement.checked} />}
      {leftElement?.element === 'switch' && (
        <Switch checked={leftElement.checked} onClick={leftElement.onClick} />
      )}
      {leftElement?.element === 'icon' && (
        <svg className={cn('left-icon', leftElement.className)}>
          <use href={`/images/icons.svg#${leftElement.icon}`} />
        </svg>
      )}

      <div className="list-item-content">
        <span className="list-item-text">{text}</span>
        {description && <span className="list-item-description">{description}</span>}
      </div>

      {secondaryText && <span className="list-item-secondary-text">{secondaryText}</span>}

      {rightElement?.element === 'icon' && (
        <svg className="right-icon">
          <use href={`/images/icons.svg#${rightElement.icon}`} />
        </svg>
      )}
      {rightElement?.element === 'emptyIcon' && <div className="empty-icon" />}
      {rightElement?.element === 'delete' && (
        <button className="text-txt-tertiary" onClick={rightElement.onClick}>
          <svg className="size-3">
            <use href="/images/icons.svg#cross" />
          </svg>
        </button>
      )}
    </li>
  )
}
