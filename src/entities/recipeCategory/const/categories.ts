export type RecipeCategory = {
  id: number
  name: string
  fullName: string
  img: string
}

// TODO: удалить файл
export const categories: RecipeCategory[] = [
  {
    id: 1,
    name: 'Горячее',
    fullName: 'Горячие блюда',
    img: '/images/recipes/category-1.jpg',
  },
  {
    id: 2,
    name: 'Супы',
    fullName: 'Супы',
    img: '/images/recipes/category-2.jpg',
  },
  {
    id: 3,
    name: 'Салаты',
    fullName: 'Салаты',
    img: '/images/recipes/category-3.jpg',
  },
  {
    id: 4,
    name: 'Десерты',
    fullName: 'Десерты',
    img: '/images/recipes/category-4.jpg',
  },
  {
    id: 5,
    name: 'Закуски',
    fullName: 'Закуски',
    img: '/images/recipes/category-5.jpg',
  },
  {
    id: 6,
    name: 'Выпечка',
    fullName: 'Выпечка',
    img: '/images/recipes/category-6.jpg',
  },
  {
    id: 7,
    name: 'Заготовки',
    fullName: 'Заготовки',
    img: '/images/recipes/category-7.jpg',
  },
  {
    id: 8,
    name: 'Напитки',
    fullName: 'Напитки',
    img: '/images/recipes/category-8.jpg',
  },
  {
    id: 9,
    name: 'Соусы',
    fullName: 'Соусы',
    img: '/images/recipes/category-9.jpg',
  },
]
