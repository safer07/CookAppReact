export enum StepperType {
  SIMPLE = "simple",
  MEDIUM = "medium",
  BIG = "big",
}

type StepperProps = {
  stepsCount: number;
  currentIndex: number;
  setStep?: (index: number) => void;
  type?: StepperType;
};

export default function Stepper({
  stepsCount,
  currentIndex,
  setStep = () => {},
  type,
}: StepperProps) {
  if (type === StepperType.SIMPLE)
    return (
      <ol className="flex gap-1">
        {[...new Array(stepsCount)].map((_, index) => (
          <li
            key={index}
            className={`h-0.5 grow rounded-full ${currentIndex === index ? "bg-primary" : "bg-base-borders"}`}
          ></li>
        ))}
      </ol>
    );

  return (
    <ol className="flex flex-wrap justify-center gap-2">
      {[...new Array(stepsCount)].map((_, index) => (
        <li key={index}>
          {currentIndex === index ? (
            <div className="headline-small surface-accent-secondary grid size-4 place-content-center rounded-full">
              {index + 1}
            </div>
          ) : (
            <button
              className="headline-small surface-default grid size-4 place-content-center rounded-full border-2 border-current text-accent-color"
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