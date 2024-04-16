import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setActiveNavBarTab } from "../../store/slices/navBarSlice";
import Catalog from "./components/Catalog";
import MyRecipes from "./components/MyRecipes";
import Favourites from "./components/Favourites";
import TopAppBar from "../../widgets/TopAppBar";
import SegmentedButton from "../../shared/ui/SegmentedButton";

type RecipesPageTabId = "catalog" | "myrecipes" | "favourites";

interface IRecipesPageTab {
  name: string;
  link: string;
  id: RecipesPageTabId;
}

export default function RecipesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RecipesPageTabId>("catalog");
  const tabs: IRecipesPageTab[] = [
    { name: "Каталог", link: "", id: "catalog" },
    {
      name: "Мои рецепты",
      link: "?my-recipes",
      id: "myrecipes",
    },
    {
      name: "Избранное",
      link: "?favourites",
      id: "favourites",
    },
  ];
  const activeTabIndex: number = tabs.findIndex(
    (item) => item.id === activeTab,
  );

  useEffect(() => {
    dispatch(setActiveNavBarTab("recipes"));
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
      <TopAppBar title="Рецепты" />
      <div className="py-1">
        <SegmentedButton
          buttons={tabs.map((tab) => tab.name)}
          handleClick={(index) => setActiveTab(tabs[index].id)}
          activeTabIndex={activeTabIndex}
        />
      </div>

      {activeTab === "catalog" && <Catalog />}
      {activeTab === "myrecipes" && <MyRecipes />}
      {activeTab === "favourites" && <Favourites />}
    </>
  );
}
