import { useDispatch, useSelector } from "react-redux";

import Input from "../../../shared/ui/Input";
import {
  selectCreateRecipe,
  setName,
} from "../../../store/slices/createRecipeSlice";

export default function Step1() {
  const dispatch = useDispatch();
  const { name } = useSelector(selectCreateRecipe);

  const maxName = 60;
  const maxDescription = 200;

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={name}
        onChange={(value) => dispatch(setName(value))}
        placeholder="Введите название блюда"
      />
    </div>
  );
}
