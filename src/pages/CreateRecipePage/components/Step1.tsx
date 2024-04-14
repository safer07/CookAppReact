import { useDispatch, useSelector } from "react-redux";

import {
  selectCreateRecipe,
  setName,
  setCategory,
  setDescription,
  setImg,
} from "../../../store/slices/createRecipeSlice";
import { categories } from "../../../entities/recipeCategory/const/categories";
import Input from "../../../shared/ui/Input";
import TextArea from "../../../shared/ui/TextArea";
import PhotoUpload from "../../../shared/ui/PhotoUpload";

export default function Step1() {
  const dispatch = useDispatch();
  const { name, category, description, img } = useSelector(selectCreateRecipe);

  const maxName = 60;
  const maxDescription = 200;

  // console.log(categories);

  return (
    <div className="layout-grid flex flex-col gap-3">
      <Input
        value={name}
        onChange={(value) => dispatch(setName(value))}
        placeholder="Введите название блюда"
        label="Название"
        showCount
        maxLength={maxName}
      />

      {/* мапать тут категории в селект */}
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

      <PhotoUpload
        image={img}
        onChange={(value) => dispatch(setImg(value))}
        label="Главное фото"
      />
    </div>
  );
}
