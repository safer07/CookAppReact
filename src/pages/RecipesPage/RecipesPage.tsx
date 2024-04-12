import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { NavBarTabs, setActiveNavBarTab } from "../../store/slices/navBarSlice";
import Catalog from "./components/Catalog";
import MyRecipes from "./components/MyRecipes";
import Favourites from "./components/Favourites";
import SegmentedButton from "../../shared/ui/SegmentedButton";

export enum RecipesPageTabs {
  CATALOG = "catalog",
  MYRECIPES = "myrecipes",
  FAVOURITES = "profile",
}

interface IRecipesPageTab {
  name: string;
  link: string;
  id: RecipesPageTabs;
}

export default function RecipesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RecipesPageTabs>(
    RecipesPageTabs.CATALOG,
  );
  const tabs: IRecipesPageTab[] = [
    { name: "Каталог", link: "", id: RecipesPageTabs.CATALOG },
    {
      name: "Мои рецепты",
      link: "?my-recipes",
      id: RecipesPageTabs.MYRECIPES,
    },
    {
      name: "Избранное",
      link: "?favourites",
      id: RecipesPageTabs.FAVOURITES,
    },
  ];
  const activeTabIndex: number = tabs.findIndex(
    (item) => item.id === activeTab,
  );

  useEffect(() => {
    dispatch(setActiveNavBarTab(NavBarTabs.RECIPES));
    if (window.location.search) {
      tabs.forEach((tab) => {
        if (window.location.search === tab.link) setActiveTab(tab.id);
      });
    }
  }, []);

  useEffect(() => {
    navigate(tabs[activeTabIndex].link);
  }, [activeTab]);

  return (
    <>
      <div className="py-1.5">
        <h1 className="headline-large">Рецепты</h1>
      </div>
      <div className="py-1">
        <SegmentedButton
          buttons={tabs.map((tab) => tab.name)}
          handleClick={(index) => setActiveTab(tabs[index].id)}
          activeTabIndex={activeTabIndex}
        />
      </div>

      {activeTab === RecipesPageTabs.CATALOG && <Catalog />}
      {activeTab === RecipesPageTabs.MYRECIPES && <MyRecipes />}
      {activeTab === RecipesPageTabs.FAVOURITES && <Favourites />}
    </>
  );
}
