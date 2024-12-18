import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import TopAppBar from '@/widgets/TopAppBar'
import useUser, { UserType } from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'
import { backendUrl } from '@/shared/config'

const genderSelectOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

type formDataType = {
  name: string
  lastName: string
  email: string
  gender: string
  birthDate: string
}

export default function ProfileEditPage(): JSX.Element {
  const navigate = useNavigate()
  const { token, user, status, setUser, setStatus } = useUser()
  const [formData, setFormData] = useState<formDataType>({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    gender: user?.gender || '',
    birthDate: user?.birthDate || '',
  })

  useEffect(() => {
    if (!token || !user) navigate('/profile', { replace: true })
  }, [token, user])

  useEffect(() => {
    setStatus('init')
  }, [])

  async function onSubmit() {
    if (!user?._id) return

    axios.defaults.baseURL = backendUrl
    const requestOptions = {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }

    try {
      // TODO: вынести fetch в api
      setStatus('loading')
      const { data } = await axios.patch<UserType>(`/profile/${user._id}`, formData, requestOptions)
      setUser(data)
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  // TODO: сделать обработки ошибок

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
