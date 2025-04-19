import { useActionState, useState } from 'react'
import toast from 'react-hot-toast'

import TopAppBar from '@/widgets/TopAppBar'

import { updateProfileDTOSchema, useUser, userService } from '@/entities/user'
import type { UpdateProfileDTO, UpdateProfileFormData } from '@/entities/user'

import { queryClient } from '@/shared/api'
import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import { CHANGE_PASSWORD_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'

import { GENDER_SELECT_OPTIONS } from '../const/genderSelectOptions'

type ActionStateData = Omit<UpdateProfileFormData, 'gender'>

type FormState = {
  data: ActionStateData
  error?: CustomError | null
}

export default function ProfileEditPage(): React.JSX.Element {
  const { user, setUser } = useUser()
  const [gender, setGender] = useState<string>(user?.gender ?? '')
  const [actionState, action, isPending] = useActionState<FormState, FormData>(onSubmit, {
    data: {
      name: user?.name ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      birthDate: user?.birthDate?.split('T')[0] ?? '',
    },
  })

  async function onSubmit(prevState: FormState, formData: FormData) {
    if (!user?.id) return { ...prevState, error: { message: 'Не найден ID пользователя' } }

    const data = Object.fromEntries(formData.entries()) as ActionStateData
    const DTO = {
      ...data,
      gender: gender === '' ? null : gender,
      birthDate: data.birthDate === '' ? null : data.birthDate,
    } as UpdateProfileDTO
    const result = updateProfileDTOSchema.safeParse(DTO)

    if (result.success) {
      try {
        const updatedUser = await userService.updateProfile(user.id, result.data)
        setUser(updatedUser)
        queryClient.setQueryData(['user', user.id], updatedUser)
        toast.success('Профиль обновлён')
        return { data }
      } catch (error) {
        toast.error('Не удалось обновить профиль')
        return { data, error: catchHttpError(error) }
      }
    } else return { data, error: { errors: formatZodError(result) } }
  }

  return (
    <>
      <TopAppBar title="Редактировать профиль" back />

      <form className="grid h-full py-2" action={action}>
        <div className="mb-2">
          <div className="space-y-2">
            <Input defaultValue={actionState.data.name} label="Имя" name="name" />
            <Input defaultValue={actionState.data.lastName} label="Фамилия" name="lastName" />
            <Input defaultValue={actionState.data.email} label="Email" name="email" />
            <Select
              value={gender}
              options={GENDER_SELECT_OPTIONS}
              onChange={setGender}
              label="Пол"
            />
            <Input
              defaultValue={actionState?.data?.birthDate}
              type="date"
              label="Дата рождения"
              name="birthDate"
            />
          </div>
          <Button className="mt-3" text="Изменить пароль" link={CHANGE_PASSWORD_ROUTE} />
          <ErrorComponent
            className="mt-2"
            error={(isPending ? null : actionState?.error) ?? null}
          />
        </div>

        <Button
          className="mt-auto"
          text={'Сохранить изменения'}
          type="submit"
          variant="primary"
          disabled={isPending}
          loading={isPending}
        />
      </form>
    </>
  )
}
