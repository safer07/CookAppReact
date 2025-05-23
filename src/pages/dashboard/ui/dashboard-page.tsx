import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import { RECIPE_STATUSES, useCategories } from '@/entities/recipe'

import { dashboardService } from '../api/dashboard-service'
import type { DashboardData } from '../model/api'
import { DashboardRecipe } from '../model/dashboard-recipe'
import InfoCards from './info-cards'

export default function DashboardPage(): React.JSX.Element {
  const { categories } = useCategories()
  const [data, setData] = useState<DashboardData | null>(null)
  const [recipes, setRecipes] = useState<DashboardRecipe[] | null>(null)

  useEffect(() => {
    async function fetchData() {
      setData(null)
      try {
        const response = await dashboardService.getDashboard()
        setData(response)
      } catch {
        toast.error('Не удалось загрузить данные')
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchPendingRecipes() {
      setRecipes(null)
      try {
        const response = await dashboardService.getPendingRecipes()
        setRecipes(response)
      } catch {
        toast.error('Не удалось загрузить рецепты')
      }
    }

    fetchPendingRecipes()
  }, [])

  return (
    <>
      <h1 className="headline-large">Панель управления</h1>

      <InfoCards data={data} />

      <div className="mt-3">
        <h2 className="headline-medium mb-2">Рецепты на проверку</h2>
        {recipes?.length !== 0 ? (
          <table className="border-base-borders [&_td]:border-base-borders/50 surface-default [&_th]:border-base-600 min-w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border [&_td]:px-2 [&_td]:py-1 [&_td]:align-baseline [&_th]:border-b-2 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:align-bottom [&_tr:not(:last-child)_td]:border-b">
            <thead>
              <tr>
                <th style={{ width: '3.5rem' }}>№</th>
                <th>Название</th>
                <th style={{ width: '10rem' }}>Категория</th>
                <th style={{ width: '15rem' }}>Автор</th>
                <th style={{ width: '10rem' }}>Статус</th>
                <th>Причина отказа</th>
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
                  <td>{recipe.moderationMessage}</td>
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
