import { Link } from "react-router-dom";

import Button from "../../../shared/ui/Button";

export default function MyRecipes() {
  return (
    <>
      <div className="pt-1">
        <Link to="/create-recipe/">
          <Button text="Добавить рецепт" icon="plus" block />
        </Link>
      </div>
      <div className="mt-3 pb-2">
        <div>
          <h2 className="headline-medium">Мои рецепты</h2>
        </div>
        <p className="mt-1">
          Войдите или зарегистрируйтесь, чтобы создать рецепт
        </p>
        <p className="mt-1">Список рецептов пуст. Создайте новый рецепт</p>
      </div>
    </>
  );
}
