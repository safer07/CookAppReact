import { StepperMediumProps } from '../model/types'

export default function StepperMedium({
  stepsCount,
  currentIndex,
  setStep,
}: StepperMediumProps): React.JSX.Element {
  return (
    <ol className="flex flex-wrap justify-center gap-2">
      {[...new Array(stepsCount)].map((_, index) => (
        <li key={index}>
          {currentIndex === index ? (
            <div className="headline-small surface-accent-secondary grid size-4 place-content-center rounded-full select-none">
              {index + 1}
            </div>
          ) : (
            <button
              className="headline-small surface-default text-primary hover:text-primary-active grid size-4 place-content-center rounded-full border-2 border-current transition-colors duration-300 select-none"
              onClick={() => setStep(index)}
            >
              {index + 1}
            </button>
          )}
        </li>
      ))}
    </ol>
  )
}
