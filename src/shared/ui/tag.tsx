import { cn } from '../lib'

export type TagSurface = 'surface-accent' | 'surface-green' | 'surface-yellow' | 'surface-red'

type TagProps = {
  text: string
  onClick?: () => void
  surface?: TagSurface
  className?: string
}

export default function Tag({ text, onClick, surface = 'surface-accent', className }: TagProps) {
  return (
    <span
      className={cn('label-small rounded-full px-1.5 py-0.5', surface, className)}
      onClick={onClick}
    >
      {text}
    </span>
  )
}
