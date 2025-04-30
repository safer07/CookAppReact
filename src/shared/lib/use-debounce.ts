import { useEffect } from 'react'

export const useDebounce = (
  debounceFunction: () => void,
  monitoringVariables: React.DependencyList = [],
  debounceTime = 500,
) => {
  useEffect(() => {
    const timer = setTimeout(debounceFunction, debounceTime)
    return () => clearTimeout(timer)
  }, [...monitoringVariables, debounceFunction, debounceTime])
}
