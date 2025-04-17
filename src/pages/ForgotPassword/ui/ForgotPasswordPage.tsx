import { useActionState } from 'react'

import TopAppBar from '@/widgets/TopAppBar'

import Button from '@/shared/ui/Button'
import ErrorComponent from '@/shared/ui/ErrorComponent'
import Input from '@/shared/ui/Input'

import { onSubmit } from './onSubmit'
import type { FormState } from './onSubmit'

export default function ForgotPasswordPage(): React.JSX.Element {
  const [actionState, action, isPending] = useActionState<FormState, FormData>(onSubmit, {})

  return (
    <>
      <TopAppBar title="Забыли пароль" back />
      <form className="mt-2 space-y-3" action={action}>
        <div className="space-y-2">
          <Input defaultValue={actionState?.email} type="email" label="Email" name="email" />
          <ErrorComponent error={(isPending ? null : actionState?.error) ?? null} />
          {actionState?.success && (
            <p className="text-system-positive">
              Ссылка на смену пароля отправлена на указанный email
            </p>
          )}
        </div>

        <Button
          variant="primary"
          text="Получить ссылку"
          fullWidth
          type="submit"
          disabled={isPending}
          loading={isPending}
        />
      </form>
    </>
  )
}
