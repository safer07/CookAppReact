type SimpleStepperProps = {
  type: "simple";
  setStep?: never;
  createStep?: never;
};

type MediumStepperProps = {
  type: "medium";
  setStep: (index: number) => void;
  createStep?: never;
};

type BigStepperProps = {
  type: "big";
  setStep: (index: number) => void;
  createStep: () => void;
};

type StepperProps = {
  stepsCount: number;
  currentIndex: number;
} & (SimpleStepperProps | MediumStepperProps | BigStepperProps);

export default function Stepper({
  stepsCount,
  currentIndex,
  type = "simple",
  setStep = () => {},
  createStep,
}: StepperProps) {
  if (type === "simple")
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

  if (type === "medium")
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

  if (type === "big")
    return (
      <ol className="grid grid-cols-4 gap-1">
        {[...new Array(stepsCount)].map((_, index) => (
          <li key={index} className="aspect-[3/4] w-full">
            {currentIndex === index ? (
              <div className="surface-accent-secondary grid size-full place-content-center rounded-lg text-4xl">
                {index + 1}
              </div>
            ) : (
              <button
                className="surface-default grid size-full place-content-center rounded-lg border-2 border-current text-4xl text-accent-color"
                onClick={() => setStep(index)}
              >
                {index + 1}
              </button>
            )}
          </li>
        ))}
        <li className="grid aspect-[3/4] w-full place-content-center">
          <button onClick={createStep}>
            <svg className="size-4 text-primary">
              <use href="/images/icons.svg#plus_circle" />
            </svg>
          </button>
        </li>
      </ol>
    );
}
