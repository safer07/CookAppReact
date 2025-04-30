import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TopAppBar from '@/widgets/top-app-bar'

import SegmentedButton from '@/shared/ui/segmented-button'

import { type RecipesPageTabId, tabs } from '../const/recipes-page-tabs'
import Catalog from './catalog'
import Favorites from './favorites'
import MyRecipes from './my-recipes'

export default function RecipesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<RecipesPageTabId>('catalog')
  const activeTabIndex: number = tabs.findIndex(item => item.id === activeTab)

  useEffect(() => {
    navigate(tabs[activeTabIndex].link)
  }, [activeTab, navigate, activeTabIndex])

  return (
    <>
      <TopAppBar title="Рецепты" />
      <div className="py-1">
        <SegmentedButton
          buttons={tabs.map(tab => tab.name)}
          handleClick={index => setActiveTab(tabs[index].id)}
          activeTabIndex={activeTabIndex}
        />
      </div>

      {activeTab === 'catalog' && <Catalog />}
      {activeTab === 'myrecipes' && <MyRecipes />}
      {activeTab === 'favorites' && <Favorites />}
    </>
  )
}
