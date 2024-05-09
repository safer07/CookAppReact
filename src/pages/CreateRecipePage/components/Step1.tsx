import { observer } from "mobx-react-lite";

import createRecipeStore from "../store/createRecipeStore";
import { categories } from "../../../entities/recipeCategory/const/categories";
import RecipeLimits from "../../../entities/recipe/const/limits";
import Input from "../../../shared/ui/Input";
import TextArea from "../../../shared/ui/TextArea";
import PhotoUpload from "../../../shared/ui/PhotoUpload";
import Select from "../../../shared/ui/Select";

export default observer(function Step1(): JSX.Element {
  const {
    name,
    category,
    description,
    img,
    setName,
    setCategory,
    setDescription,
    setImg,
  } = createRecipeStore;

  const categoriesOptions = categories.map((category) => {
    return { value: category.id, label: category.fullName };
  });

  return (
    <div className="layout-grid flex flex-col gap-3">
      <Input
        value={name}
        onChange={(value) => setName(value)}
        placeholder="Введите название блюда"
        label="Название"
        showCount
        maxLength={RecipeLimits.name.max}
      />

      <Select
        value={category}
        options={categoriesOptions}
        onChange={(value) => setCategory(value)}
        placeholder="Выберите категорию"
        label="Категория"
      />

      <TextArea
        value={description}
        onChange={(value) => setDescription(value)}
        label="Описание"
        showCount
        maxLength={RecipeLimits.description.max}
      />

      <PhotoUpload
        image={img}
        onChange={(value) => setImg(value)}
        label="Главное фото"
      />
    </div>
  );
});
