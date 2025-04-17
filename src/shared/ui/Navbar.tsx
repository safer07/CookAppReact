import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { RECIPES_ROUTE, SETTINGS_ROUTE } from '@/shared/routes'

import { cn } from '../lib'

type NavBarTabs = 'recipes' | 'settings'

type NavBarTab = {
  name: string
  id: NavBarTabs
  link: string
  icon: string
}

export default function NavBar(): React.JSX.Element {
  const pathname: string = useLocation().pathname
  const [activeTab, setActiveTab] = useState('')
  const tabs: NavBarTab[] = [
    { name: 'Рецепты', id: 'recipes', link: RECIPES_ROUTE, icon: 'fork' },
    {
      name: 'Настройки',
      id: 'settings',
      link: SETTINGS_ROUTE,
      icon: 'settings',
    },
  ]

  useEffect(() => {
    if (pathname === RECIPES_ROUTE || pathname.startsWith('/recipes')) setActiveTab('recipes')
    else if (pathname.startsWith(SETTINGS_ROUTE)) setActiveTab('settings')
  }, [pathname])

  // TODO:
  // нужно объединять для recipe/.. и recipes (через NavLink)
  // function getClass(isActive: boolean): string {
  //   return `flex flex-col items-center py-1 transition-colors duration-300 ${isActive ? "cursor-default text-primary" : "text-txt-secondary hover:text-primary"}`;
  // }
  // ({isActive}) => getClass(isActive)

  return (
    <div className="layout-grid border-base-borders border-y">
      <nav className="layout-wide grid grid-cols-2">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.link}
            className={cn('flex flex-col items-center py-1 transition-colors duration-300', {
              'text-primary cursor-default': activeTab === tab.id,
              'text-txt-secondary hover:text-primary': activeTab !== tab.id,
            })}
          >
            <svg className="size-3">
              <use href={`/images/icons.svg#${tab.icon}`} />
            </svg>
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
