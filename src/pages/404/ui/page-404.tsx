import { MAIN_ROUTE } from '@/shared/routes'
import Button from '@/shared/ui/button'

export default function Page404(): React.JSX.Element {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="headline-large my-2 text-center">Страница не найдена</p>
      <Button text="Вернуться на главную" variant="primary" link={MAIN_ROUTE} />
    </div>
  )
}
