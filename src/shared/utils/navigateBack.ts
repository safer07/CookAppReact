import { NavigateFunction } from 'react-router-dom'

export default function navigateBack(navigate: NavigateFunction) {
  if (window.history?.length > 1) navigate(-1)
  else navigate('/', { replace: true })
}
