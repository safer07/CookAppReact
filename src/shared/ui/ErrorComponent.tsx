import { CustomError } from '../model/customError'

type ErrorComponentProps = {
  error: CustomError
}

export default function ErrorComponent({ error }: ErrorComponentProps): JSX.Element | null {
  if (!error) return null

  return (
    <div className="space-y-1">
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