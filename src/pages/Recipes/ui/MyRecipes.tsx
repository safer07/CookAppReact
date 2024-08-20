import useUser from '@/entities/user/store/store'
import Button from '@/shared/ui/Button'

export default function MyRecipes() {
  const { user } = useUser()

  // TODO: делать fetch рецептов пользователя

  if (!user) {
    return (
      <>
        <p className="mt-2">Войдите или зарегистрируйтесь, чтобы создать рецепт</p>
        <Button className="mt-2" text="Войти" icon="login" block link="/login" />
      </>
    )
  }

  return (
    <>
      <div className="pt-1">
        <Button text="Добавить рецепт" icon="plus" block link="/create-recipe" />
      </div>
      <div className="mt-3 pb-2">
        <div>
          <h2 className="headline-medium">Мои рецепты</h2>
        </div>
        <p className="mt-1">Список рецептов пуст. Создайте новый рецепт</p>
      </div>
    </>
  )
}
