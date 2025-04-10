import { useEffect } from 'react'

import { RECIPE_DIFFICULTIES } from '@/entities/recipe'

import Input from '@/shared/ui/Input'
import ListItem from '@/shared/ui/ListItem'

import type { CreateRecipeStore } from '../store/createRecipeStore'
import type { EditRecipeStore } from '../store/editRecipeStore'

type StepProps = {
  setStepIsValid: (status: boolean) => void
  store: CreateRecipeStore | EditRecipeStore
}

export default function Step2({ setStepIsValid, store }: StepProps): React.JSX.Element {
  const { recipe, setDifficulty, setTime } = store()
  const { time, difficulty } = recipe

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
  }, [time, difficulty, setStepIsValid])

  return (
    <form className="space-y-3">
      <h2 className="headline-medium">Параметры рецепта</h2>

      <div>
        <h3 className="headline-small">Время приготовления</h3>
        <div className="mt-2 space-y-2">
          <Input
            value={hours ? String(hours) : ''}
            onChange={value => setHours(+value)}
            type="number"
            label="Часы"
            min="0"
          />
          <Input
            value={minutes ? String(minutes) : ''}
            onChange={value => setMinutes(+value)}
            type="number"
            label="Минуты"
            min="0"
          />
        </div>
      </div>

      <div>
        <h3 className="headline-small">Сложность</h3>
        <ul className="layout-wide mt-2 space-y-1">
          {RECIPE_DIFFICULTIES.map(item => (
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
