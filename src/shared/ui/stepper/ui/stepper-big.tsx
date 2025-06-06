import { StepperBigProps } from '../model/types'

export default function StepperBig({
  stepsCount,
  currentIndex,
  setStep,
  createStep,
}: StepperBigProps): React.JSX.Element {
  return (
    <ol className="grid grid-cols-4 gap-1">
      {[...new Array(stepsCount)].map((_, index) => (
        <li key={index} className="aspect-3/4 w-full">
          {currentIndex === index ? (
            <div className="surface-accent-secondary grid size-full place-content-center rounded-lg text-4xl">
              {index + 1}
            </div>
          ) : (
            <button
              className="surface-default text-primary grid size-full place-content-center rounded-lg border-2 border-current text-4xl transition-colors duration-300 hover:text-primary-active"
              onClick={() => setStep(index)}
            >
              {index + 1}
            </button>
          )}
        </li>
      ))}
      <li className="grid aspect-3/4 w-full place-content-center">
        <button onClick={createStep} type="button">
          <svg className="text-primary size-4 hover:text-primary-active">
            <use href="/images/icons.svg#plus_circle" />
          </svg>
        </button>
      </li>
    </ol>
  )
}
