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
          className={`h-0.5 grow rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-base-borders'}`}
        ></li>
      ))}
    </ol>
  )
}
