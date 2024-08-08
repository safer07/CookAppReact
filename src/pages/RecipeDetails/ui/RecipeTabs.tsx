import { useState } from 'react'

import SegmentedButton from '@/shared/ui/SegmentedButton'
import ListItem from '@/shared/ui/ListItem'

type IRecipeTabs = { recipe: IFullRecipeItem }

export default function RecipeTabs({ recipe }: IRecipeTabs): JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tabs = ['Ингредиенты', 'Рецепт']

  return (
    <>
      <SegmentedButton
        buttons={tabs}
        handleClick={setActiveTabIndex}
        activeTabIndex={activeTabIndex}
      />

      {activeTabIndex === 0 && (
        <ul className="layout-fullwidth mt-1">
          {recipe.totalIngredients.map((item, index) => (
            <ListItem
              key={index}
              size="small"
              text={item.name}
              secondaryText={`${item.amount} ${item.unit}`}
            />
          ))}
        </ul>
      )}

      {activeTabIndex === 1 && recipe.steps && (
        <ol className="mt-3 grid gap-3">
          {recipe.steps.map((step, index) => (
            <li key={index} className="grid gap-1">
              <div className="headline-medium">Шаг {index + 1}</div>
              {step.ingredients.length > 0 && (
                <ul className="layout-fullwidth">
                  {step.ingredients.map((item, index) => (
                    <ListItem
                      key={index}
                      size="small"
                      text={item.name}
                      secondaryText={`${item.amount} ${item.unit}`}
                    />
                  ))}
                </ul>
              )}
              <p className="text-secondary-color">{step.description}</p>
              {step.img && (
                <img
                  className="w-full"
                  src={step.img}
                  alt={`Шаг ${index + 1}`}
                />
              )}
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
