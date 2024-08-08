import axios from 'axios'

import { categories } from '@/entities/recipeCategory/const/categories'

type fetchRecipesProps = {
  categoryId: string
  searchQuery: string
}

export function fetchCategories() {
  return new Promise<IRecipeCategoryItem[]>((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 100)
  })
}

export async function fetchRecipes(props: fetchRecipesProps) {
  try {
    const category = props?.categoryId ? `category=${props.categoryId}` : ''
    const search = props?.searchQuery ? `&search=${props.searchQuery}` : ''
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/recipes?${category}${search}`
    // const response = await fetch(url);
    // const data = response.json();
    // return data;
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchRecipe(id: string) {
  try {
    const url = `https://65f16da8034bdbecc7628a2a.mockapi.io/fullRecipes/${id}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
