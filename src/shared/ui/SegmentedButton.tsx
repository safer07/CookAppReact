import { cn } from '../lib'

type SegmentedButtonProps = {
  buttons: string[]
  handleClick: (value: number) => void
  activeTabIndex: number
}

export default function SegmentedButton({
  buttons,
  handleClick,
  activeTabIndex,
}: SegmentedButtonProps) {
  return (
    <div className={`segmented-button grid-cols-${buttons.length}`}>
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
