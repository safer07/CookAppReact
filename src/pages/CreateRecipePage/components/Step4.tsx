import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCreateRecipe,
  setSteps,
  setHidden,
  emptyStep,
} from "../../../store/slices/createRecipeSlice";
import RecipeLimits from "../../../entities/recipe/const/limits";
import Stepper from "../../../shared/ui/Stepper";
import Select, { SelectOption } from "../../../shared/ui/Select";
import TextArea from "../../../shared/ui/TextArea";
import PhotoUpload from "../../../shared/ui/PhotoUpload";
import ListItem from "../../../shared/ui/ListItem";
import ButtonIcon from "../../../shared/ui/ButtonIcon";
import useDebounce from "../../../shared/hooks/debounce";
import Button from "../../../shared/ui/Button";
import Modal from "../../../shared/ui/Modal";

export default function Step4(): JSX.Element {
  const dispatch = useDispatch();
  const { totalIngredients, steps, hidden } = useSelector(selectCreateRecipe);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [tempStepDescription, setTempStepDescription] = useState<string>("");
  const debouncedStepDescription: string = useDebounce(
    tempStepDescription,
    300,
  );

  const currentStepIngredients: Ingredient[] =
    steps[currentStepIndex].ingredients;

  // Вообще все
  // const ingredientsOptions = totalIngredients.map((ingredient) => {
  //   return { value: ingredient.name, label: ingredient.name };
  // });

  // С флагом disabled
  // const ingredientsOptions = totalIngredients.map((ingredient) => {
  //   return {
  //     value: ingredient.name,
  //     label: ingredient.name,
  //     disabled: stepsHasIngredient(ingredient.name),
  //   };
  // });

  // Без disabled
  const unusedIngredientsOptions: SelectOption[] = totalIngredients
    .filter((i) => !stepsHasIngredient(i.name))
    .map((i) => {
      return {
        value: i.name,
        label: i.name,
        secondaryText: `${i.amount} ${i.unit}`,
      };
    });

  function setStepValue(value: string, field: "img" | "description"): void {
    const newSteps = structuredClone(steps);
    newSteps[currentStepIndex][field] = value;
    dispatch(setSteps(newSteps));
  }

  function deleteStep(): void {
    const newSteps = steps.filter((_, index) => index !== currentStepIndex);
    dispatch(setSteps(newSteps));
    if (currentStepIndex !== 0) setCurrentStepIndex((prev) => prev - 1);
  }

  function stepsHasIngredient(ingredientName: string): boolean {
    return steps.some((step) =>
      step.ingredients.some((i) => i.name === ingredientName),
    );
  }

  function addIngredient(): void {
    if (!selectedIngredient || stepsHasIngredient(selectedIngredient)) return;
    // Нужно копировать массив и всё внутри нето, так как нельзя использовать изначальные значения
    const newSteps = structuredClone(steps);
    const copyTotalIngredients = structuredClone(totalIngredients);

    newSteps[currentStepIndex].ingredients = [
      ...newSteps[currentStepIndex].ingredients,
    ];
    const addedIngredient: Ingredient = {
      ...copyTotalIngredients.find((i) => i.name === selectedIngredient)!,
    };

    if (addedIngredient) {
      newSteps[currentStepIndex].ingredients.push(addedIngredient);
      dispatch(setSteps(newSteps));
      setSelectedIngredient("");
    }
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
    const newSteps = steps.map((step) => ({ ...step }));
    newSteps[currentStepIndex].ingredients = [
      ...newSteps[currentStepIndex].ingredients.filter(
        (i) => i.name !== deletedIngredientName,
      ),
    ];
    dispatch(setSteps(newSteps));
  }

  useEffect(() => {
    setStepValue(debouncedStepDescription, "description");
  }, [debouncedStepDescription]);

  useEffect(() => {
    setTempStepDescription(steps[currentStepIndex].description);
  }, [currentStepIndex, steps]);

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
            createStep={() => dispatch(setSteps([...steps, emptyStep]))}
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
            value={selectedIngredient}
            options={unusedIngredientsOptions}
            onChange={(value) => setSelectedIngredient(value)}
            placeholder="Выберите ингредиенты"
          />

          <Button
            text="Добавить ингредиент к шагу"
            onClick={addIngredient}
            disabled={
              !selectedIngredient || stepsHasIngredient(selectedIngredient)
            }
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
            onClick: () => dispatch(setHidden(!hidden)),
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
      />
    </>
  );
}
