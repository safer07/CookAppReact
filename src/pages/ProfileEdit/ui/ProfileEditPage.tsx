import { useState } from 'react'
import axios from 'axios'

import TopAppBar from '@/widgets/TopAppBar'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import Select from '@/shared/ui/Select'
import { backendUrl } from '@/shared/config'

export default function ProfileEditPage(): JSX.Element {
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // из store

  // const {
  //   name,
  //   category,
  //   description,
  //   img,
  //   setName,
  //   setCategory,
  //   setDescription,
  //   setImg,
  // } = useCreateRecipe()

  const categoriesOptions = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ]

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    axios.defaults.baseURL = backendUrl
    const requestOptions = {
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }

    // try {
    //   // TODO: вынести fetch в api
    //   setLoading(true)
    //   const { data } = await axios.post<LoginResponse>(
    //     '/login',
    //     formData,
    //     requestOptions,
    //   )
    //   localStorage.setItem('token', data.token)
    //   setToken(data.token)
    //   setLoading(false)
    // } catch (error) {
    //   if (axios.isAxiosError<ValidationError[] | LoginErrorResponse>(error)) {
    //     const data = error.response?.data
    //     if (data) {
    //       if (Array.isArray(data)) setErrors(data.map((error) => error.msg))
    //       else setErrors([data?.message])
    //     }
    //   }
    //   setLoading(false)
    // }
  }

  return (
    <>
      <TopAppBar title="Редактировать профиль" back />

      <div className="my-2 grow space-y-3 overflow-y-auto">
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            value={name}
            onChange={(value) => setName(value)}
            label="Имя"
          />
          <Input
            value={name}
            onChange={(value) => setName(value)}
            label="Фамилия"
          />
          <Input
            value={name}
            onChange={(value) => setName(value)}
            label="Email"
          />
          <Select
            value={''}
            options={categoriesOptions}
            onChange={() => {}}
            label="Пол"
          />
          <Input
            type="date"
            value={name}
            onChange={(value) => setName(value)}
            label="Дата рождения"
          />
        </form>

        {/* TODO: добавить функционал смены пароля */}
        <Button text="Изменить пароль" block />
      </div>

      <div className="mt-auto shrink-0 py-2">
        <Button
          text={'Сохранить изменения'}
          onClick={() => {}}
          variant="primary"
          block
          submit
        />
      </div>
    </>
  )
}
