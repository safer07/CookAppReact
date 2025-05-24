import { cn } from '../lib'

type SegmentedButtonProps = {
  buttons: string[]
  handleClick: (value: number) => void
  activeTabIndex: number
  className?: string
}

export default function SegmentedButton({
  buttons,
  handleClick,
  activeTabIndex,
  className,
}: SegmentedButtonProps) {
  return (
    <div className={cn('segmented-button', className)}>
      {buttons.map((tab, index) => (
        <button
          key={tab}
          className={cn('segment', { active: activeTabIndex === index })}
          onClick={() => handleClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
