import { useEffect } from 'react'

import useCreateRecipe from '../store/store'
import recipeDifficulties from '@/entities/recipe/const/recipeDifficulties'
import Input from '@/shared/ui/Input'
import ListItem from '@/shared/ui/ListItem'

type StepProps = { setStepIsValid: (status: boolean) => void }

export default function Step2({ setStepIsValid }: StepProps): React.JSX.Element {
  const { recipeData, setDifficulty, setTime } = useCreateRecipe()
  const { time, difficulty } = recipeData

  let hours: number | null = null
  let minutes: number | null = null

  if (time) {
    hours = Math.floor(time / 60)
    minutes = time % 60
  }

  function setHours(value: number) {
    if (minutes) setTime(value * 60 + minutes)
    else setTime(value * 60)
  }

  function setMinutes(value: number) {
    if (hours) setTime(hours * 60 + +value)
    else setTime(+value)
  }

  useEffect(() => {
    if (time && difficulty) setStepIsValid(true)
    else setStepIsValid(false)
  }, [time, difficulty])

  return (
    <form className="layout-grid flex flex-col gap-3">
      <h2 className="headline-medium">Параметры рецепта</h2>

      <div>
        <h3 className="headline-small">Время приготовления</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Input
            value={hours ? String(hours) : ''}
            onChange={(value) => setHours(+value)}
            type="number"
            label="Часы"
            min="0"
          />
          <Input
            value={minutes ? String(minutes) : ''}
            onChange={(value) => setMinutes(+value)}
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
                element: 'radio',
                checked: difficulty === item.value,
              }}
              onClick={() => setDifficulty(item.value)}
            />
          ))}
        </ul>
      </div>
    </form>
  )
}
