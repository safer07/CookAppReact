import useCreateRecipe from "../store/store";
import recipeDifficulties from "../../../entities/recipe/const/recipeDifficulties";
import Input from "../../../shared/ui/Input";
import ListItem from "../../../shared/ui/ListItem";

export default function Step2(): JSX.Element {
  const {
    timeHours,
    timeMinutes,
    difficulty,
    setDifficulty,
    setTimeHours,
    setTimeMinutes,
  } = useCreateRecipe();

  return (
    <div className="layout-grid flex flex-col gap-3">
      <h2 className="headline-medium">Параметры рецепта</h2>

      <div>
        <h3 className="headline-small">Время приготовления</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Input
            value={timeHours ? String(timeHours) : ""}
            onChange={(value) => setTimeHours(+value)}
            type="number"
            label="Часы"
            min="0"
          />
          <Input
            value={timeMinutes ? String(timeMinutes) : ""}
            onChange={(value) => setTimeMinutes(+value)}
            type="number"
            label="Минуты"
            min="0"
          />
        </div>
      </div>

      <div>
        <h3 className="headline-small">Сложность</h3>
        <ul className="layout-fullwidth mt-2 grid gap-1">
          {recipeDifficulties.map((item) => (
            <ListItem
              key={item.value}
              text={item.difficultyText}
              description={item.description}
              leftElement={{
                element: "radio",
                checked: difficulty === item.value,
              }}
              onClick={() => setDifficulty(item.value)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
