import { useEffect, useState } from 'react'

import TopAppBar from '@/widgets/TopAppBar'

import { type UpdateProfileFormData, updateProfileDTOSchema, useUser } from '@/entities/user'

import { catchHttpError, formatZodError } from '@/shared/lib'
import type { CustomError } from '@/shared/model'
import { CHANGE_PASSWORD_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'

// TODO: в сущность user (config? model?)
const genderSelectOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

export default function ProfileEditPage(): React.JSX.Element {
  const { user, status, setStatus, updateProfile } = useUser()
  const [error, setError] = useState<CustomError>(null)
  const [formData, setFormData] = useState<UpdateProfileFormData>({
    name: user?.name ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    gender: user?.gender ?? '',
    birthDate: user?.birthDate?.split('T')[0] ?? '',
  })

  useEffect(() => {
    setStatus('init')
  }, [setStatus])

  async function onSubmit() {
    if (!user?.id) return
    setError(null)

    const DTO = {
      ...formData,
      gender: formData.gender === '' ? null : formData.gender,
      birthDate: formData.birthDate === '' ? null : formData.birthDate,
    }
    const result = updateProfileDTOSchema.safeParse(DTO)

    if (result.success) {
      try {
        await updateProfile(user.id, result.data)
      } catch (error) {
        catchHttpError(error, setError)
      }
    } else {
      setError({
        errors: formatZodError(result),
      })
    }
  }

  return (
    <>
      <TopAppBar title="Редактировать профиль" back />

      {/* TODO: переверстать, чтобы было внутри формы (а лучше создать layout) */}
      <div className="layout-fullwidth my-2 grow overflow-y-auto">
        <div className="layout-grid space-y-3">
          <form className="space-y-3">
            <Input
              value={formData.name || ''}
              onChange={value => setFormData(prev => ({ ...prev, name: value }))}
              label="Имя"
            />
            <Input
              value={formData.lastName || ''}
              onChange={value => setFormData(prev => ({ ...prev, lastName: value }))}
              label="Фамилия"
            />
            <Input
              value={formData.email || ''}
              onChange={value => setFormData(prev => ({ ...prev, email: value }))}
              label="Email"
            />
            <Select
              value={formData.gender || ''}
              options={genderSelectOptions}
              onChange={value => setFormData(prev => ({ ...prev, gender: value }))}
              label="Пол"
            />
            <Input
              type="date"
              value={formData.birthDate || ''}
              onChange={value => setFormData(prev => ({ ...prev, birthDate: value }))}
              label="Дата рождения"
            />
          </form>
          <Button text="Изменить пароль" link={CHANGE_PASSWORD_ROUTE} />
          <ErrorComponent error={error} />
        </div>
      </div>

      <div className="mt-auto shrink-0 py-2">
        <Button
          text={'Сохранить изменения'}
          onClick={onSubmit}
          variant="primary"
          fullWidth
          disabled={status === 'loading'}
          loading={status === 'loading'}
        />
      </div>
    </>
  )
}
