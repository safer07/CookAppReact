import { useEffect, useState } from "react";

import useCreateRecipe, { emptyStep } from "../store/store";
import RecipeLimits from "../../../entities/recipe/const/limits";
import Stepper from "../../../shared/ui/Stepper";
import Select from "../../../shared/ui/Select";
import TextArea from "../../../shared/ui/TextArea";
import PhotoUpload from "../../../shared/ui/PhotoUpload";
import ListItem from "../../../shared/ui/ListItem";
import ButtonIcon from "../../../shared/ui/ButtonIcon";
import Modal from "../../../shared/ui/Modal";
import useDebounce from "../../../shared/hooks/debounce";

export default function Step4(): JSX.Element {
  const { totalIngredients, steps, hidden, setSteps, setHidden } =
    useCreateRecipe();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [currentStepIngredientsNames, setCurrentStepIngredientsNames] =
    useState<string[]>([]);
  const [tempStepDescription, setTempStepDescription] = useState<string>("");
  const debouncedStepDescription: string = useDebounce(
    tempStepDescription,
    300,
  );

  const currentStepIngredients: Ingredient[] =
    steps[currentStepIndex].ingredients;

  const ingredientsOptions: SelectOption[] = totalIngredients.map(
    (ingredient): SelectOption => {
      const usedIngredient: boolean = stepsHasIngredient(ingredient.name);
      let optionStatus: ListItemStatus = "";
      if (currentStepIngredientsNames.includes(ingredient.name)) {
        optionStatus = "selected";
      } else if (usedIngredient) optionStatus = "disabled";

      return {
        value: ingredient.name,
        label: ingredient.name,
        secondaryText: `${ingredient.amount} ${ingredient.unit}`,
        status: optionStatus,
        description: usedIngredient
          ? `Шаг ${findStepWithIngredient(ingredient.name)}`
          : "",
      };
    },
  );

  function setStepValue(value: string, field: "img" | "description"): void {
    const newSteps = structuredClone(steps);
    newSteps[currentStepIndex][field] = value;
    setSteps(newSteps);
  }

  function deleteStep(): void {
    const newSteps = steps.filter((_, index) => index !== currentStepIndex);
    setSteps(newSteps);
    if (currentStepIndex !== 0) setCurrentStepIndex((prev) => prev - 1);
  }

  function stepsHasIngredient(ingredientName: string): boolean {
    return steps.some((step): boolean =>
      step.ingredients.some((i) => i.name === ingredientName),
    );
  }

  function findStepWithIngredient(ingredientName: string): number {
    return (
      steps.findIndex((step) =>
        step.ingredients.some((i) => i.name === ingredientName),
      ) + 1
    );
  }

  function stepIsEmpty(): boolean {
    if (
      !currentStepIngredients.length &&
      !steps[currentStepIndex].img &&
      !steps[currentStepIndex].description
    )
      return true;
    else return false;
  }

  function onClickDeleteStep(): void {
    if (stepIsEmpty()) deleteStep();
    else setModalIsOpen(true);
  }

  function deleteIngredient(deletedIngredientName: string): void {
    setCurrentStepIngredientsNames((prev) =>
      prev.filter((i) => i !== deletedIngredientName),
    );
  }

  useEffect(() => {
    setStepValue(debouncedStepDescription, "description");
  }, [debouncedStepDescription]);

  useEffect(() => {
    setTempStepDescription(steps[currentStepIndex].description);
  }, [currentStepIndex, steps]);

  useEffect(() => {
    const stepIngredientsNames: string[] = steps[
      currentStepIndex
    ].ingredients.map((i) => i.name);

    setCurrentStepIngredientsNames(stepIngredientsNames);
  }, [currentStepIndex, steps.length]);

  useEffect(() => {
    // Нужно копировать массив и всё внутри нето, так как нельзя использовать изначальные значения
    const newSteps = structuredClone(steps);
    const filteredIngredients = totalIngredients.filter((i) =>
      currentStepIngredientsNames.includes(i.name),
    );
    newSteps[currentStepIndex].ingredients = filteredIngredients;
    setSteps(newSteps);
  }, [currentStepIngredientsNames]);

  return (
    <>
      <div className="layout-grid flex flex-col gap-3">
        <div>
          <p className="headline-medium mb-2">Добавить шаги приготовления</p>
          <Stepper
            currentIndex={currentStepIndex}
            stepsCount={steps.length}
            type="big"
            setStep={setCurrentStepIndex}
            createStep={() => setSteps([...steps, emptyStep])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex h-6 items-center justify-between gap-2">
            <h2 className="headline-medium">Шаг {currentStepIndex + 1}</h2>
            {steps.length > 1 && (
              <ButtonIcon
                icon="delete"
                onClick={onClickDeleteStep}
                variant="tertiary"
              />
            )}
          </div>
          <h3 className="headline-small">Ингредиенты в шаге</h3>

          <Select
            value={currentStepIngredientsNames}
            options={ingredientsOptions}
            onChange={(value) => setCurrentStepIngredientsNames(value)}
            label={`Ингредиенты (шаг ${currentStepIndex + 1})`}
            placeholder="Выберите ингредиенты"
            multiple
            optionSize="medium"
          />

          {currentStepIngredients.length > 0 && (
            <ul className="layout-fullwidth">
              {currentStepIngredients.map((i) => (
                <ListItem
                  key={i.name}
                  text={i.name}
                  secondaryText={`${i.amount} ${i.unit}`}
                  size="medium"
                  rightElement={{
                    element: "delete",
                    onClick: () => deleteIngredient(i.name),
                  }}
                />
              ))}
            </ul>
          )}
        </div>

        <TextArea
          value={tempStepDescription}
          onChange={(value) => setTempStepDescription(value)}
          label={`Рецепт (шаг ${currentStepIndex + 1})`}
          showCount
          maxLength={RecipeLimits.stepDescription.max}
        />

        <PhotoUpload
          image={steps[currentStepIndex].img}
          onChange={(value) => setStepValue(value, "img")}
          label={`Фото (шаг ${currentStepIndex + 1})`}
        />
      </div>

      <ul className="mt-2">
        <ListItem
          text="Опубликовать рецепт"
          size="medium"
          leftElement={{
            element: "switch",
            checked: !hidden,
            onClick: () => setHidden(!hidden),
          }}
        />
      </ul>

      <Modal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        onOk={deleteStep}
        okText="Удалить"
        title="Удалить шаг рецепта?"
        text="В удаляемом шаге рецепта есть заполненные поля. Удалить этот рецепта? Все внесённые данные будут утеряны."
        type="negative"
        cancellable
      />
    </>
  );
}
