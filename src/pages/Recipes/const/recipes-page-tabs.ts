export type RecipesPageTabId = 'catalog' | 'myrecipes' | 'favorites'

type RecipesPageTab = {
  name: string
  link: string
  id: RecipesPageTabId
}

export const tabs: RecipesPageTab[] = [
  { name: 'Каталог', link: '', id: 'catalog' },
  {
    name: 'Мои рецепты',
    link: '?my-recipes',
    id: 'myrecipes',
  },
  {
    name: 'Избранное',
    link: '?favorites',
    id: 'favorites',
  },
]
