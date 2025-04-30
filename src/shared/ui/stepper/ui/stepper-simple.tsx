import { cn } from '@/shared/lib'

import { StepperSimpleProps } from '../model/types'

export default function StepperSimple({
  stepsCount,
  currentIndex,
}: StepperSimpleProps): React.JSX.Element {
  return (
    <ol className="flex gap-1">
      {[...new Array(stepsCount)].map((_, index) => (
        <li
          key={index}
          className={cn('h-0.5 grow rounded-full', {
            'bg-primary': currentIndex === index,
            'bg-base-borders': currentIndex !== index,
          })}
        />
      ))}
    </ol>
  )
}
