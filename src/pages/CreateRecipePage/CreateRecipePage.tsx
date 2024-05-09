import { useState } from "react";
import { useNavigate } from "react-router-dom";

import createRecipeStore from "./store/createRecipeStore";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import TopAppBar from "../../widgets/TopAppBar";
import Stepper from "../../shared/ui/Stepper";
import Button from "../../shared/ui/Button";
import Modal from "../../shared/ui/Modal";

export default function CreateRecipePage(): JSX.Element {
  const navigate = useNavigate();
  const { resetCreateRecipe } = createRecipeStore;
  const [step, setStep] = useState<number>(1);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
  const [modalFinishIsOpen, setModalFinishIsOpen] = useState<boolean>(false);

  const stepsCount = 4;

  function onClickBack(): void {
    if (step === 1) navigate(-1);
    else setStep((prev) => prev - 1);
  }

  function onClickNext(): void {
    if (step === stepsCount) onRecipeComplete();
    else setStep((prev) => prev + 1);
  }

  // TODO: сохранять state и в localStorage

  function onDelete(): void {
    resetCreateRecipe();
    navigate("/");
  }

  function onRecipeComplete(): void {
    // TODO: Загружать на сервер (при успехе обнулить redux и открыть popup - успешно)
    resetCreateRecipe();
    setModalFinishIsOpen(true);
  }

  return (
    <div className="flex h-svh flex-col">
      <TopAppBar
        title="Создать рецепт"
        back
        backOnClick={onClickBack}
        rightIcon={{
          icon: "delete",
          onClick: () => setModalDeleteIsOpen(true),
        }}
      />

      <Stepper stepsCount={stepsCount} currentIndex={step - 1} type="simple" />

      <div className="layout-fullwidth mt-3 grow basis-0 overflow-y-auto pb-2">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
        <Button text="Назад" onClick={onClickBack} block />
        <Button
          text={step !== stepsCount ? "Далее" : "Сохранить"}
          onClick={onClickNext}
          variant="primary"
          block
        />
      </div>

      <Modal
        open={modalDeleteIsOpen}
        setOpen={setModalDeleteIsOpen}
        onOk={onDelete}
        okText="Удалить"
        title="Удалить рецепт?"
        text="Очистить поля рецепта? Все внесённые данные будут утеряны."
        type="negative"
        cancellable
      />

      <Modal
        open={modalFinishIsOpen}
        setOpen={setModalFinishIsOpen}
        onOk={() => navigate("/")}
        okText="Готово"
        title="Рецепт создан"
        text="Рецепт сохранён в базе данных"
      />
    </div>
  );
}
