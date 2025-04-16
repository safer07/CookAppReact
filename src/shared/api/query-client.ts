import toast from 'react-hot-toast'

import { QueryCache, QueryClient } from '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: { errorMessage?: string }
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 5 * 60 * 1000, // 5 минут
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown, query) => {
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage)
      }
    },
  }),
})
