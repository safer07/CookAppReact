import { useState } from 'react'

import Modal from '../ui/modal'

type Props = {
  okText: string
  title: string
  text: string
}

export function useConfirm({
  okText,
  title,
  text,
}: Props): [React.ElementType, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () =>
    new Promise(resolve => {
      setPromise({ resolve })
    })

  function handleClose(): void {
    setPromise(null)
  }

  function handleConfirm(): void {
    promise?.resolve(true)
    handleClose()
  }

  function handleCancel(): void {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Modal
      open={promise !== null}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText={okText}
      title={title}
      text={text}
      type="negative"
      cancellable
    />
  )

  return [ConfirmationDialog, confirm]
}
