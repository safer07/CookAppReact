import { useEffect, useRef } from 'react'

export const useDebounce = (
  callback: () => void,
  dependencies: React.DependencyList = [],
  delay = 500,
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(callback, delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [callback, delay, ...dependencies])
}
