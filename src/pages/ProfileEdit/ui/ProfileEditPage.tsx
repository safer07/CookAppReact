import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'
import { updateProfileDTOSchema, useUser, type UpdateProfileDTO } from '@/entities/user'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import { catchHttpError, formatZodError } from '@/shared/utils'
import { CHANGE_PASSWORD_ROUTE, PROFILE_ROUTE } from '@/shared/routes'
import type { CustomError } from '@/shared/model'

// TODO: в сущность user (config? model?)
const genderSelectOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

export default function ProfileEditPage(): React.JSX.Element {
  const navigate = useNavigate()
  const { user, status, setStatus, updateProfile } = useUser()
  const [error, setError] = useState<CustomError>(null)
  const [formData, setFormData] = useState<UpdateProfileDTO>({
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    gender: user?.gender,
    birthDate: user?.birthDate?.split('T')[0] || '',
  })

  useEffect(() => {
    if (!user) navigate(PROFILE_ROUTE, { replace: true })
  }, [user])

  useEffect(() => {
    setStatus('init')
  }, [])

  async function onSubmit() {
    if (!user?._id) return
    setError(null)

    const result = updateProfileDTOSchema.safeParse(formData)
    if (result.success) {
      try {
        await updateProfile(user._id, formData)
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
              onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
              label="Имя"
            />
            <Input
              value={formData.lastName || ''}
              onChange={(value) => setFormData((prev) => ({ ...prev, lastName: value }))}
              label="Фамилия"
            />
            <Input
              value={formData.email || ''}
              onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
              label="Email"
            />
            <Select
              value={formData.gender || ''}
              options={genderSelectOptions}
              onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              label="Пол"
            />
            <Input
              type="date"
              value={formData.birthDate || ''}
              onChange={(value) => setFormData((prev) => ({ ...prev, birthDate: value }))}
              label="Дата рождения"
            />
          </form>
          <Button text="Изменить пароль" link={CHANGE_PASSWORD_ROUTE} />
          <ErrorComponent error={error} />
          {status === 'success' && <p className="text-system-positive">Профиль обновлён</p>}
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
