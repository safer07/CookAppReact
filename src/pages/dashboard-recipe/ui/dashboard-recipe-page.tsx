import { useActionState, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { queryClient } from '@/shared/api'
import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import Button from '@/shared/ui/button'
import ErrorComponent from '@/shared/ui/error-component'
import Select from '@/shared/ui/select'
import Textarea from '@/shared/ui/textarea'

import { dashboardRecipeService } from '../api/dashboard-recipe-service'
import { STATUS_OPTIONS } from '../const/status-options'
import { useDashboardRecipe } from '../lib/use-dashboard-recipe'
import { recipeModerationSchema } from '../model/api'
import type { RecipeModerationDTO } from '../model/api'
import RecipeInfo from './recipe-info'

type FormState = {
  data: Omit<RecipeModerationDTO, 'status'>
  error?: CustomError | null
}

const emptyState = { data: { moderationMessage: '' } }

export default function DashboardRecipePage(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { recipe, error: fetchError, isPending: isRecipePending } = useDashboardRecipe(id)
  const [moderationStatus, setModerationStatus] = useState<string>('')
  const [actionState, action, isPending] = useActionState<FormState, FormData>(onSubmit, emptyState)

  async function onSubmit(prevState: FormState, formData: FormData) {
    const moderationMessage = (formData.get('message') as string | null) ?? ''
    const DTO = { status: moderationStatus, moderationMessage }
    const result = recipeModerationSchema.safeParse(DTO)
    const state = { data: { moderationMessage } }

    if (!id) return { ...state, error: { message: 'Не найден ID рецепта' } }

    if (result.success) {
      try {
        await dashboardRecipeService.updateRecipe(id, result.data)
        queryClient.invalidateQueries({ queryKey: ['recipe', id, 'dashboard'] })
        toast.success('Рецепт обновлён')
        setModerationStatus('')
        return emptyState
      } catch (error) {
        toast.error('Не удалось обновить рецепт')
        return { ...state, error: catchHttpError(error) }
      }
    } else return { ...state, error: { errors: formatZodError(result) } }
  }

  return (
    <>
      <h1 className="headline-large">Рецепт: {recipe?.name}</h1>

      <div className="mt-3">
        <ErrorComponent error={catchHttpError(fetchError)} />
        {isRecipePending && <p>Загрузка...</p>}
        {recipe && (
          <>
            <RecipeInfo recipe={recipe} />

            <form
              action={action}
              className="border-base-borders surface-default mt-3 space-y-2 rounded-lg border p-2"
            >
              <h2 className="headline-medium">Результат проверки</h2>
              <Select
                className="w-28"
                options={STATUS_OPTIONS}
                value={moderationStatus}
                onChange={setModerationStatus}
                label="Статус"
              />
              <Textarea
                defaultValue={actionState.data.moderationMessage}
                label="Причина отказа"
                name="message"
              />
              <ErrorComponent error={(isPending ? null : actionState?.error) ?? null} />
              <Button type="submit" text="Сохранить" variant={'primary'} disabled={isPending} />
            </form>
          </>
        )}
      </div>
    </>
  )
}
