import {
  getIngredientNameByUnitId,
  getRecipeDifficultyTextAndSurface,
  getRecipeStatusTagSurface,
  getRecipeStatusText,
  getUnitNameByUnitId,
  useCategories,
  useIngredients,
} from '@/entities/recipe'

import { minsToHoursAndMins } from '@/shared/lib'
import Tag from '@/shared/ui/tag'

import { DashboardFullRecipe } from '../model/dashboard-full-recipe'

export default function RecipeInfo({ recipe }: { recipe: DashboardFullRecipe }): React.JSX.Element {
  const { categories } = useCategories()
  const { ingredients } = useIngredients()
  const [difficultyText, tagDifficultySurface] = getRecipeDifficultyTextAndSurface(
    recipe?.difficulty,
  )

  return (
    <div className="border-base-borders surface-default *:border-base-borders/50 grid grid-cols-[auto_1fr] rounded-lg border py-0.5 *:px-2 *:py-1 *:nth-last-[n+3]:border-b">
      <div>id</div>
      <div>{recipe.id}</div>
      <div>name</div>
      <div>{recipe.name}</div>
      <div>Описание</div>
      <div>{recipe.description}</div>
      <div>categoryId</div>
      <div>
        {categories.find(category => category.id === recipe.categoryId)?.fullName ??
          'Категория не найдена'}
      </div>
      <div>Автор</div>
      <div>{recipe.authorId}</div>
      <div>Главное изображение</div>
      <img src={recipe.img} alt={recipe.name} />
      <div>Время приготовления</div>
      <div>{minsToHoursAndMins(recipe.time)}</div>
      <div>Сложность</div>
      <div>
        <Tag text={difficultyText} surface={tagDifficultySurface} />
      </div>
      <div>Ингредиенты</div>
      <ul>
        {recipe.totalIngredients.map(ingredient => (
          <li key={ingredient.unitId}>
            {getIngredientNameByUnitId(ingredient.unitId, ingredients) ?? '???'} {ingredient.amount}
            {getUnitNameByUnitId(ingredient.unitId, ingredients) ?? '???'}
          </li>
        ))}
      </ul>
      <div>Шаги приготовления</div>
      <ol className="space-y-2">
        {recipe.steps.map((step, index) => (
          <li className="space-y-1" key={index}>
            <span className="block font-bold">Шаг {index + 1}</span>
            <p>{step.description}</p>
            <img src={step.img} alt={`Фото шага ${index + 1}`} />
            {step.ingredients.length > 0 && (
              <ul className="space-y-1">
                {step.ingredients.map(ingredient => (
                  <li key={ingredient.unitId}>
                    {getIngredientNameByUnitId(ingredient.unitId, ingredients) ?? '???'}{' '}
                    {ingredient.amount}
                    {getUnitNameByUnitId(ingredient.unitId, ingredients) ?? '???'}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      <div>Рецепт скрыт?</div>
      <div>{recipe.hidden === true ? 'да' : 'нет'}</div>
      <div>Статус</div>
      <div>
        {' '}
        <Tag
          text={getRecipeStatusText(recipe.status) ?? '???'}
          surface={getRecipeStatusTagSurface(recipe.status)}
        />
      </div>
      <div>Причина отказа</div>
      <div>{recipe.moderationMessage}</div>
    </div>
  )
}
