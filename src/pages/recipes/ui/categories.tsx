import { RecipeCategoryCard, useCategories } from '@/entities/recipe'

import ErrorComponent from '@/shared/ui/error-component'

import { useCatalog } from '../store/catalog-store'

export default function Categories(): React.JSX.Element {
  const { categories, isPending, isError } = useCategories()
  const setCategories = useCatalog(state => state.setCategories)

  return (
    <>
      <h2 className="headline-medium">Категории</h2>

      {!isError ? (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {isPending
            ? [...new Array(9)].map((_, i) => <RecipeCategoryCard.Skeleton key={i} />)
            : categories &&
              categories.map(category => (
                <RecipeCategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setCategories([category.id])}
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
