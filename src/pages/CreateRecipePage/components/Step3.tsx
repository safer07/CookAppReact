import { useState } from "react";

import useCreateRecipe from "../store/store";
import ListItem from "../../../shared/ui/ListItem";
import Button from "../../../shared/ui/Button";
import Modal from "../../../shared/ui/Modal";
import Input from "../../../shared/ui/Input";

export default function Step3(): JSX.Element {
  const { steps, totalIngredients, setSteps, setTotalIngredients } =
    useCreateRecipe();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientAmount, setNewIngredientAmount] = useState<number>(0);
  const [newIngredientUnit, setNewIngredientUnit] = useState<string>("");

  const newIngredient: Ingredient = {
    name: newIngredientName,
    amount: newIngredientAmount,
    unit: newIngredientUnit,
  };

  function onAddIngredient(): void {
    if (
      !newIngredientName ||
      !newIngredientAmount ||
      !newIngredientUnit ||
      totalIngredients.some(
        (ingredient) => ingredient.name === newIngredientName,
      )
    ) {
      return;
    }

    setTotalIngredients([...totalIngredients, newIngredient]);
    setNewIngredientName("");
    setNewIngredientAmount(0);
    setNewIngredientUnit("");
  }

  function deleteIngredient(deletedIngredient: Ingredient): void {
    const newTotalIngredients: Ingredient[] = totalIngredients.filter(
      (ingredient) => ingredient !== deletedIngredient,
    );
    steps.forEach((step) => {
      step.ingredients = step.ingredients.filter(
        (ingredient) => ingredient.name !== deletedIngredient.name,
      );
    });

    setSteps(steps);
    setTotalIngredients(newTotalIngredients);
  }

  return (
    <>
      <div className="layout-grid flex flex-col gap-3">
        <h2 className="headline-medium">Ингредиенты</h2>

        {totalIngredients.length > 0 && (
          <ul className="layout-fullwidth">
            {totalIngredients.map((i) => (
              <ListItem
                key={i.name}
                text={i.name}
                secondaryText={`${i.amount} ${i.unit}`}
                size="medium"
                rightElement={{
                  element: "delete",
                  onClick: () => deleteIngredient(i),
                }}
              />
            ))}
          </ul>
        )}

        <Button
          text="Добавить ингредиент"
          icon="plus"
          onClick={() => setModalIsOpen(true)}
        />
      </div>

      <Modal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        onOk={onAddIngredient}
        okText="Добавить"
        title="Добавить ингредиент"
        cancellable
      >
        <div className="mt-2">
          <Input
            value={newIngredientName}
            onChange={(value) => setNewIngredientName(value)}
            label="Введите название продукта"
          />
          <div className="mt-2 flex gap-2">
            <Input
              className="grow"
              type="number"
              value={String(newIngredientAmount)}
              onChange={(value) => setNewIngredientAmount(+value)}
              min="0"
              label="Количество"
            />
            <Input
              className="w-[7.5rem]"
              value={newIngredientUnit}
              onChange={(value) => setNewIngredientUnit(value)}
              label="Ед. измерения"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
