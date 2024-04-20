import { StepperMediumProps } from "./types";

export default function StepperMedium({
  stepsCount,
  currentIndex,
  setStep,
}: StepperMediumProps): JSX.Element {
  return (
    <ol className="flex flex-wrap justify-center gap-2">
      {[...new Array(stepsCount)].map((_, index) => (
        <li key={index}>
          {currentIndex === index ? (
            <div className="headline-small surface-accent-secondary grid size-4 select-none place-content-center rounded-full">
              {index + 1}
            </div>
          ) : (
            <button
              className="headline-small surface-default grid size-4 select-none place-content-center rounded-full border-2 border-current text-accent-color transition-colors duration-300 hover-hover:hover:text-primary-active"
              onClick={() => setStep(index)}
            >
              {index + 1}
            </button>
          )}
        </li>
      ))}
    </ol>
  );
}
