import { cn } from '@/shared/lib'

import Radio from '../Radio'
import Switch from '../Switch'
import { listItemVariants } from './listItemVariants'
import type { ListItemProps } from './types'

function Icon({ icon, className }: { icon: string; className?: string }) {
  return (
    <svg className={cn('size-3 shrink-0', className)} aria-hidden="true">
      <use href={`/images/icons.svg#${icon}`} />
    </svg>
  )
}

export default function ListItem({
  size,
  selected,
  disabled,
  text,
  description,
  secondaryText,
  leftElement,
  rightElement,
  onClick,
}: ListItemProps) {
  function onItemClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>): void {
    event.stopPropagation()
    if (disabled) return
    if (onClick) onClick()
  }

  return (
    <li
      className={listItemVariants({
        size,
        _clickable: onClick !== undefined,
        selected,
        disabled,
      })}
      onClick={event => onItemClick(event)}
    >
      {leftElement?.element === 'radio' && <Radio checked={leftElement.checked} />}
      {leftElement?.element === 'switch' && (
        <Switch checked={leftElement.checked} onClick={leftElement.onClick} />
      )}
      {leftElement?.element === 'icon' && (
        <Icon icon={leftElement.icon} className={leftElement.className} />
      )}

      <div className="list-item-content">
        <span className="list-item-text">{text}</span>
        {description && <span className="list-item-description">{description}</span>}
      </div>

      {secondaryText && <span className="list-item-secondary-text">{secondaryText}</span>}

      {rightElement?.element === 'icon' && <Icon icon={rightElement.icon} className="right-icon" />}
      {rightElement?.element === 'emptyIcon' && (
        <div className="size-3 shrink-0" aria-hidden="true" />
      )}
      {rightElement?.element === 'delete' && (
        <button className="text-txt-tertiary" onClick={rightElement.onClick} aria-label="удалить">
          <Icon icon="cross" />
        </button>
      )}
    </li>
  )
}
