import { useState } from "react";

import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import ListItem from "../../ui/ListItem";
import Stepper from "../../ui/Stepper";

export default function CookingMode({ recipe, setCookingMode }) {
  const [stepIndex, setStepIndex] = useState(0);
  const stepsCount = recipe.steps.length;
  const step = recipe.steps[stepIndex];

  function onClickBack() {
    if (stepIndex === 0) setCookingMode(false);
    else setStepIndex((prev) => prev - 1);
  }

  function onClickNext() {
    if (stepIndex === stepsCount - 1) setCookingMode(false);
    else setStepIndex((prev) => prev + 1);
  }

  return (
    <div className="layout-fullwidth flex h-svh flex-col">
      <div className="grow overflow-y-auto">
        <div className="relative min-h-[4.5rem]">
          <img
            className="aspect-[9/7] w-full object-cover"
            src={step.img}
            alt={stepIndex + 1}
          />
          <ButtonIcon
            className="absolute left-2 top-2"
            icon="/images/icons.svg#cross"
            onClick={() => setCookingMode(false)}
          />
        </div>
        <div className="layout-grid">
          <div className="grid gap-2 py-2">
            <h1 className="headline-large text-center">Шаг {stepIndex + 1}</h1>
            <Stepper
              stepsCount={stepsCount}
              currentIndex={stepIndex}
              setStep={setStepIndex}
            />
            {step.ingredients.length > 0 && (
              <ul className="layout-fullwidth">
                {step.ingredients.map((item, index) => (
                  <ListItem
                    key={index}
                    size="tiny"
                    text={item.name}
                    secondaryText={`${item.amount} ${item.unit}`}
                  />
                ))}
              </ul>
            )}
            <p className="text-primary-color">{step.description}</p>
          </div>
        </div>
      </div>
      <div className="layout-grid">
        <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
          <Button text="Назад" onClick={onClickBack} block />
          <Button
            text={stepIndex !== stepsCount - 1 ? "Далее" : "Готово"}
            onClick={onClickNext}
            type="primary"
            block
          />
        </div>
      </div>
    </div>
  );
}
