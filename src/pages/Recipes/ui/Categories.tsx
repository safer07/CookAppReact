import { useEffect } from 'react'

import { RecipeCategoryCard, useCategories } from '@/entities/recipe'

import ErrorComponent from '@/shared/ui/ErrorComponent'

import { useCatalog } from '../store/catalogStore'

export default function Categories(): React.JSX.Element {
  const { categories, getCategories, status } = useCategories()
  const setFilteredCategories = useCatalog(state => state.setFilteredCategories)

  useEffect(() => {
    if (!categories.length) getCategories()
  }, [categories, getCategories])

  return (
    <>
      <h2 className="headline-medium">Категории</h2>

      {status !== 'error' ? (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {status === 'loading'
            ? [...new Array(9)].map((_, i) => <RecipeCategoryCard.Skeleton key={i} />)
            : categories.map(category => (
                <RecipeCategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setFilteredCategories([category.id])}
                />
              ))}
        </div>
      ) : (
        <ErrorComponent
          className="mt-1"
          error={{ message: 'Не удалось загрузить категории рецептов' }}
        />
      )}
    </>
  )
}
