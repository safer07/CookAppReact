import { NavigateFunction } from 'react-router-dom'

import { MAIN_ROUTE } from '../routes'

export default function navigateBack(navigate: NavigateFunction) {
  if (window.history?.length > 1) navigate(-1)
  else navigate(MAIN_ROUTE, { replace: true })
}
