import { useState } from "react";
import SegmentedButton from "../../ui/SegmentedButton";
import Catalog from "./Catalog";
import Favourites from "./Favourites";

export default function RecipesPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabs = ["Каталог", "Мои рецепты", "Избранное"];

  return (
    <div className="container">
      <div className="py-1.5">
        <h1 className="headline-large">Рецепты</h1>
      </div>
      <div className="py-1">
        <SegmentedButton
          buttons={tabs}
          handleClick={setActiveTabIndex}
          activeTabIndex={activeTabIndex}
        />
      </div>

      {activeTabIndex === 0 && <Catalog />}

      {activeTabIndex === 1 && (
        <div className="py-2">
          <div>
            <h2 className="headline-medium">Мои рецепты</h2>
          </div>
        </div>
      )}

      {activeTabIndex === 2 && <Favourites />}
    </div>
  );
}
