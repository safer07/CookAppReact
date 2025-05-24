import { useState } from 'react'

import SegmentedButton from '@/shared/ui/segmented-button'

import PendingRecipes from './pending-recipes'

const RECIPES_TABS = ['Все', 'На проверку', 'Подтверждённые', 'Отклонённые'] as const

export default function DashboardRecipesPage(): React.JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
      <h1 className="headline-large">Рецепты</h1>

      <div className="mt-3">
        <SegmentedButton
          buttons={RECIPES_TABS as unknown as string[]}
          handleClick={setActiveTabIndex}
          activeTabIndex={activeTabIndex}
          className="mb-3 w-16"
        />

        {RECIPES_TABS[activeTabIndex] === 'На проверку' ? <PendingRecipes /> : null}
      </div>
    </>
  )
}
