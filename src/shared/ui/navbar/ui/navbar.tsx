import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/shared/lib'
import { RECIPES_ROUTE, SETTINGS_ROUTE } from '@/shared/routes'

import { NAVBAR_TABS } from '../const/navbar-tabs'
import type { NavBarTabIds } from '../model/navbar-types'

export default function NavBar(): React.JSX.Element {
  const pathname: string = useLocation().pathname
  const [activeTab, setActiveTab] = useState<NavBarTabIds | null>(null)

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
        {NAVBAR_TABS.map((tab, index) => (
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
