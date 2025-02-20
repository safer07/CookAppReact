import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/TopAppBar'

import SegmentedButton from '@/shared/ui/SegmentedButton'

import Catalog from './Catalog'
import Favorites from './Favorites'
import MyRecipes from './MyRecipes'

type RecipesPageTabId = 'catalog' | 'myrecipes' | 'favorites'

interface IRecipesPageTab {
  name: string
  link: string
  id: RecipesPageTabId
}

export default function RecipesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<RecipesPageTabId>('catalog')
  const tabs: IRecipesPageTab[] = [
    { name: 'Каталог', link: '', id: 'catalog' },
    {
      name: 'Мои рецепты',
      link: '?my-recipes',
      id: 'myrecipes',
    },
    {
      name: 'Избранное',
      link: '?favorites',
      id: 'favorites',
    },
  ]
  const activeTabIndex: number = tabs.findIndex((item) => item.id === activeTab)

  useEffect(() => {
    navigate(tabs[activeTabIndex].link)
  }, [activeTab])

  return (
    <>
      <TopAppBar title="Рецепты" />
      <div className="py-1">
        <SegmentedButton
          buttons={tabs.map((tab) => tab.name)}
          handleClick={(index) => setActiveTab(tabs[index].id)}
          activeTabIndex={activeTabIndex}
        />
      </div>

      {activeTab === 'catalog' && <Catalog />}
      {activeTab === 'myrecipes' && <MyRecipes />}
      {activeTab === 'favorites' && <Favorites />}
    </>
  )
}
