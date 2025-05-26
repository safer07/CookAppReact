import { useState } from 'react'
import { Link } from 'react-router-dom'

import { RECIPE_STATUSES, useCategories } from '@/entities/recipe'

import { catchHttpError } from '@/shared/lib'
import ErrorComponent from '@/shared/ui/error-component'
import SegmentedButton from '@/shared/ui/segmented-button'

import { useDashboardRecipes } from '../lib/use-dashboard-recipes'

const RECIPES_TABS = ['Все', 'На проверку', 'Подтверждённые', 'Отклонённые'] as const

export default function DashboardRecipesPage(): React.JSX.Element {
  const { categories } = useCategories()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const status = (() => {
    switch (RECIPES_TABS[activeTabIndex]) {
      case 'На проверку':
        return 'pending'
      case 'Подтверждённые':
        return 'approved'
      case 'Отклонённые':
        return 'rejected'
      default:
        return undefined
    }
  })()
  const { recipes, error, isPending } = useDashboardRecipes(status)

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

        <ErrorComponent error={catchHttpError(error)} />

        {isPending ? (
          <p>Загрузка...</p>
        ) : recipes?.length !== 0 ? (
          <table className="border-base-borders [&_td]:border-base-borders/50 surface-default [&_th]:border-base-600 min-w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border [&_td]:px-2 [&_td]:py-1 [&_td]:align-baseline [&_th]:border-b-2 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:align-bottom [&_tr:not(:last-child)_td]:border-b">
            <thead>
              <tr>
                <th style={{ width: '3.5rem' }}>№</th>
                <th>Название</th>
                <th style={{ width: '10rem' }}>Категория</th>
                <th style={{ width: '15rem' }}>Автор</th>
                <th style={{ width: '10rem' }}>Статус</th>
                {status !== 'approved' && <th>Причина отказа</th>}
              </tr>
            </thead>
            <tbody>
              {recipes?.map((recipe, index) => (
                <tr key={recipe.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/dashboard/recipes/${recipe.id}`} className="link">
                      {recipe.name}
                    </Link>
                  </td>
                  <td>
                    {categories.find(category => category.id === recipe.categoryId)?.fullName ??
                      'Категория не найдена'}
                  </td>
                  <td>{recipe.author.email}</td>
                  <td>{RECIPE_STATUSES[recipe.status] ?? '???'}</td>
                  {status !== 'approved' && <td>{recipe.moderationMessage}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Нет рецептов</p>
        )}
      </div>
    </>
  )
}
