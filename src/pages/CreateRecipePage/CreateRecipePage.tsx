import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { resetCreateRecipe } from "../../store/slices/createRecipeSlice";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import TopAppBar from "../../widgets/TopAppBar";
import Stepper, { StepperType } from "../../shared/ui/Stepper";
import Button, { ButtonType } from "../../shared/ui/Button";
import Modal, { ModalType } from "../../shared/ui/Modal";

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const stepsCount = 4;

  function onClickBack() {
    if (step === 1) navigate(-1);
    else setStep((prev) => prev - 1);
  }

  function onClickNext() {
    if (step === stepsCount) onRecipeComplete();
    else setStep((prev) => prev + 1);
  }

  // TODO: сохранять в redux и в localStorage

  function onDelete() {
    dispatch(resetCreateRecipe());
    navigate("/");
  }

  function onRecipeComplete() {
    // TODO: Загружать на сервер (при успехе обнулить redux и открыть popup - успешно)
  }

  return (
    <div className="flex h-svh flex-col">
      <TopAppBar
        title="Создать рецепт"
        back
        rightIcon={{
          icon: "delete",
          onClick: () => setModalIsOpen(true),
        }}
      />

      <Stepper
        stepsCount={stepsCount}
        currentIndex={step - 1}
        type={StepperType.SIMPLE}
      />

      <div className="my-2 flex grow flex-col gap-3 overflow-y-auto">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>

      <div className="layout-grid">
        <div className="mt-auto grid shrink-0 grid-cols-2 gap-2 py-2">
          <Button text="Назад" onClick={onClickBack} block />
          <Button
            text={step !== stepsCount ? "Далее" : "Готово"}
            onClick={onClickNext}
            type={ButtonType.PRIMARY}
            block
          />
        </div>
      </div>

      <Modal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        onOk={onDelete}
        title="Удалить рецепт?"
        text="Очистить поля рецепта? Все внесённые данные будут утеряны."
        type={ModalType.WARNING}
      />
    </div>
  );
}