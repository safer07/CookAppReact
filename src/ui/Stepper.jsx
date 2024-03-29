export default function Stepper({ stepsCount, currentIndex, setStep }) {
  return (
    <ol className="flex flex-wrap justify-center gap-2">
      {[...new Array(stepsCount)].map((_, index) => (
        <li key={index}>
          {currentIndex === index ? (
            <div className="headline-small grid size-4 place-content-center rounded-full bg-primary text-white">
              {index + 1}
            </div>
          ) : (
            <button
              className="headline-small grid size-4 place-content-center rounded-full border-2 border-current text-primary"
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
