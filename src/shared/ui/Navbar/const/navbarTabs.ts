import { RECIPES_ROUTE, SETTINGS_ROUTE } from '@/shared/routes'

import { NavBarTab } from '../model/navbarTypes'

export const NAVBAR_TABS: NavBarTab[] = [
  { name: 'Рецепты', id: 'recipes', link: RECIPES_ROUTE, icon: 'fork' },
  {
    name: 'Настройки',
    id: 'settings',
    link: SETTINGS_ROUTE,
    icon: 'settings',
  },
]
