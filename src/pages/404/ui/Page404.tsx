import Button from '@/shared/ui/Button'

export default function Page404(): JSX.Element {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="headline-large my-2 text-center">Страница не найдена</p>
      <Button text="Вернуться на главную" variant="primary" link="/" />
    </div>
  )
}
