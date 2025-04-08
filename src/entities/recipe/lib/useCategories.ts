import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { HttpStatus } from '@/shared/model'

import { recipesService } from '../api/recipeService'
import { RecipeCategory } from '../model/recipeCategory'

export function useCategories() {
  const [categories, setCategories] = useState<RecipeCategory[]>([])
  const [status, setStatus] = useState<HttpStatus>('init')

  useEffect(() => {
    async function fetchCategories() {
      try {
        setStatus('loading')
        const response = await recipesService.getCategories()
        setCategories(response)
        setStatus('success')
      } catch {
        setStatus('error')
        toast.error('Не удалось загрузить категории рецептов')
      }
    }

    fetchCategories()
  }, [])

  return { categories, status }
}
