import { useEffect, useRef } from 'react'

import { cn } from '../lib'
import { CustomError } from '../model/customError'

type ErrorComponentProps = {
  error: CustomError
  className?: string
}

export default function ErrorComponent({
  error,
  className = '',
}: ErrorComponentProps): React.ReactNode {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [error])

  if (!error) return null

  return (
    <div className={cn('space-y-1', className)} ref={ref}>
      {error?.message && (
        <p className="text-system-error">
          {error.message}
          {error.errors && error.errors.length !== 0 && ':'}
        </p>
      )}
      {error.errors?.length !== 0 && (
        <ul className="space-y-1">
          {error.errors?.map(({ message }, index) => (
            <li className="text-system-error" key={index}>
              {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
