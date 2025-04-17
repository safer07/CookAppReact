import { useQuery } from '@tanstack/react-query'

import { useUser, userService } from '@/entities/user'

async function fetchUser() {
  const user = await userService.getProfile()
  useUser.setState({ user })
  return user
}

export function useFetchUser(isAuth: boolean, id: string | undefined) {
  const { isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 30, // 30 минут
    enabled: isAuth && !!id,
  })

  return { error, isLoading }
}
