import ReactDOM from 'react-dom'

import { cn } from '@/shared/lib'

import Button from '../button'
import useMount from './hooks/use-mount'

type ModalProps = {
  title: string
  text?: string
  open: boolean
  setOpen?: (status: boolean) => void
  onOk: () => void
  onCancel?: () => void
  okText?: string
  type?: 'negative'
  children?: React.ReactNode
  textAlign?: 'left' | 'center'
  cancellable?: boolean
}

export default function Modal({
  title,
  text,
  open,
  setOpen,
  onOk,
  onCancel,
  okText = 'ОК',
  type,
  children,
  textAlign,
  cancellable,
}: ModalProps): React.ReactNode {
  const mounted = useMount(open)
  const textAlignClass = (() => {
    switch (textAlign) {
      case 'left':
        return 'text-left'
      case 'center':
      default:
        return 'text-center'
    }
  })()

  function onClickOk(): void {
    if (setOpen) setOpen(false)
    onOk()
  }

  function handleCancel(): void {
    if (setOpen) setOpen(false)
    if (onCancel) onCancel()
  }

  function onBackDropClick(): void {
    if (cancellable) handleCancel()
    else onOk()
  }

  if (!mounted) return null

  return ReactDOM.createPortal(
    <div className="modal" data-open={open} role="dialog">
      <div className="modal-backdrop" onClick={onBackDropClick} tabIndex={0} role="button" />
      <div className={`modal-content ${textAlignClass}`}>
        <p className="headline-medium">{title}</p>
        {text && <p className="text-txt-secondary mt-2">{text}</p>}

        {children}

        <div className={cn('mt-3 grid gap-2', { 'grid-cols-2': cancellable })}>
          {cancellable && (
            <Button text="Отмена" onClick={handleCancel} variant="tertiary" fullWidth />
          )}
          <Button
            text={okText}
            onClick={onClickOk}
            variant={type === 'negative' ? 'negative' : 'primary'}
            fullWidth
          />
        </div>
      </div>
    </div>,
    document.getElementById('modal-portal')!,
  )
}
