import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Catalog from './Catalog'
import MyRecipes from './MyRecipes'
import Favourites from './Favourites'
import TopAppBar from '@/widgets/TopAppBar'
import SegmentedButton from '@/shared/ui/SegmentedButton'

type RecipesPageTabId = 'catalog' | 'myrecipes' | 'favourites'

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
      link: '?favourites',
      id: 'favourites',
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
      {activeTab === 'favourites' && <Favourites />}
    </>
  )
}
