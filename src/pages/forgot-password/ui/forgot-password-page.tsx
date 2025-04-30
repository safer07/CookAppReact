import { useActionState } from 'react'

import TopAppBar from '@/widgets/top-app-bar'

import Button from '@/shared/ui/button'
import ErrorComponent from '@/shared/ui/error-component'
import Input from '@/shared/ui/input'

import { onSubmit } from './on-submit'
import type { FormState } from './on-submit'

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
