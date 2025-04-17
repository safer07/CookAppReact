import { useState } from 'react'

import { useCategories } from '@/entities/recipe'

import { useDebounce } from '@/shared/lib'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import Input from '@/shared/ui/Input'

import { getFiltersCount } from '../lib/getFiltersCount'
import { useCatalog } from '../store/catalogStore'
import Categories from './Categories'
import FeaturedRecipesList from './FeaturedRecipesList'
import FilteredRecipes from './FilteredRecipes'
import Filters from './Filters'

export default function Catalog(): React.JSX.Element {
  const { categories, isError } = useCategories()
  const { filters, setSearchQuery } = useCatalog()
  const [filtersIsOpen, setFiltersIsOpen] = useState<boolean>(false)
  const filtersCount = getFiltersCount(filters)
  const [inputSearchQuery, setInputSearchQuery] = useState<string>('')
  const debounceDelay = inputSearchQuery === '' ? 0 : 1000

  useDebounce(() => setSearchQuery(inputSearchQuery), [inputSearchQuery], debounceDelay)

  return (
    <>
      <div className="flex gap-2 pt-2 pb-1">
        <form className="grow">
          <Input
            type="search"
            value={inputSearchQuery}
            placeholder="Поиск..."
            iconLeft="search"
            onChange={setInputSearchQuery}
            clearButton
          />
        </form>
        <ButtonIcon
          icon="filters"
          onClick={() => setFiltersIsOpen(true)}
          variant="tertiary"
          square
          badge={filtersCount}
        />
      </div>

      <Filters
        open={filtersIsOpen}
        setClose={() => setFiltersIsOpen(false)}
        inputSearchQuery={inputSearchQuery}
        setInputSearchQuery={setInputSearchQuery}
      />

      <div className="py-2">
        {/* Каталог по умолчанию - категории + каждая отдельно */}
        {filtersCount === 0 && (
          <>
            <Categories />

            {isError ? (
              <p className="headline-medium mt-3">Не удалось загрузить рецепты</p>
            ) : (
              <>
                {categories.map(category => (
                  <FeaturedRecipesList key={category.id} category={category} />
                ))}
              </>
            )}
          </>
        )}

        {/* Показ результатов поиска или выбранной категории */}
        {filtersCount > 0 && <FilteredRecipes filtersIsOpen={filtersIsOpen} />}
      </div>
    </>
  )
}
