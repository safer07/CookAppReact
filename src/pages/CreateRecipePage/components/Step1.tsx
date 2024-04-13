import { useDispatch, useSelector } from "react-redux";

import {
  selectCreateRecipe,
  setName,
  setCategory,
  setDescription,
} from "../../../store/slices/createRecipeSlice";
import Input from "../../../shared/ui/Input";
import TextArea from "../../../shared/ui/TextArea";

export default function Step1() {
  const dispatch = useDispatch();
  const { name, category, description } = useSelector(selectCreateRecipe);

  const maxName = 60;
  const maxDescription = 200;

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={name}
        onChange={(value) => dispatch(setName(value))}
        placeholder="Введите название блюда"
        label="Название"
        showCount
        maxLength={maxName}
      />
      <Input
        value={category}
        onChange={(value) => dispatch(setCategory(value))}
        placeholder="Выберите категорию"
        label="Категория"
      />
      <TextArea
        value={description}
        onChange={(value) => dispatch(setDescription(value))}
        label="Описание"
        showCount
        maxLength={maxDescription}
      />
    </div>
  );
}
