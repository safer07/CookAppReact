import { DashboardData } from '../model/api'

export default function InfoCards({ data }: { data: DashboardData | null }): React.JSX.Element {
  return (
    <div className="mt-3 grid grid-cols-4 gap-3">
      <div className="border-base-borders surface-default rounded-lg border p-2">
        <h2 className="headline-small">Пользователи</h2>
        <dl className="mt-1 space-y-0.5">
          <div className="flex gap-1">
            <dt>Всего:</dt>
            <dd className="label-medium">{data?.users.all}</dd>
          </div>
          <div className="flex gap-1">
            <dt>На этой неделе:</dt>
            <dd className="label-medium">{data?.users.week}</dd>
          </div>
        </dl>
      </div>
      <div className="border-base-borders surface-default rounded-lg border p-2">
        <h2 className="headline-small">Рецепты</h2>
        <dl className="mt-1 space-y-0.5">
          <div className="flex gap-1">
            <dt>Всего:</dt>
            <dd className="label-medium">{data?.recipes.all}</dd>
          </div>
          <div className="flex gap-1">
            <dt>На этой неделе:</dt>
            <dd className="label-medium">{data?.recipes.week}</dd>
          </div>
          <div className="flex gap-1">
            <dt>На проверке:</dt>
            <dd className="label-medium">{data?.recipes.onModeration}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
