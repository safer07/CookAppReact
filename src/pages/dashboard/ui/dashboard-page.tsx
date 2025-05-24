import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { dashboardService } from '../api/dashboard-service'
import type { DashboardData } from '../model/api'
import InfoCards from './info-cards'

export default function DashboardPage(): React.JSX.Element {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    async function fetchData() {
      setData(null)
      try {
        const response = await dashboardService.getDashboard()
        setData(response)
      } catch {
        toast.error('Не удалось загрузить данные')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1 className="headline-large">Панель управления</h1>

      <InfoCards data={data} />
    </>
  )
}
