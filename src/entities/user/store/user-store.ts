import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { User } from '../model/user'

type UserStore = {
  user: User | null
  setUser: (value: User | null) => void
}

export const useUser = create<UserStore>()(
  persist(
    devtools(
      immer(set => ({
        user: null,
        setUser: value => set({ user: value }),
      })),
    ),
    { name: 'userStore', version: 1 },
  ),
)
