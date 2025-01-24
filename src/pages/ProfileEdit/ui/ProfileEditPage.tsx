import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'
import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'
import { PROFILE_ROUTE } from '@/shared/routes'
import { UpdateProfileDTO } from '@/entities/user/model/api'

// TODO: в сущность user (config? model?)
const genderSelectOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

export default function ProfileEditPage(): JSX.Element {
  const navigate = useNavigate()
  const { user, status, setStatus, updateProfile } = useUser()
  const [formData, setFormData] = useState<UpdateProfileDTO>({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: user?.gender,
    birthDate: user?.birthDate || '',
  })

  useEffect(() => {
    if (!user) navigate(PROFILE_ROUTE, { replace: true })
  }, [user])

  useEffect(() => {
    setStatus('init')
  }, [])

  async function onSubmit() {
    if (!user?._id) return

    try {
      // TODO: сделать валидацию формы
      await updateProfile(user._id, formData)
    } catch (error) {
      // TODO: сделать обработки ошибок
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
              value={formData.name}
              onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
              label="Имя"
            />
            <Input
              value={formData.lastName}
              onChange={(value) => setFormData((prev) => ({ ...prev, lastName: value }))}
              label="Фамилия"
            />
            <Input
              value={formData.email}
              onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
              label="Email"
            />
            <Select
              value={formData.gender}
              options={genderSelectOptions}
              onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              label="Пол"
            />
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(value) => setFormData((prev) => ({ ...prev, birthDate: value }))}
              label="Дата рождения"
            />
          </form>
          {/* TODO: добавить функционал смены пароля */}
          <Button text="Изменить пароль" fullWidth />
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
