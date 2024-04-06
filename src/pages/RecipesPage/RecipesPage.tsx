import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setActiveTab } from "../../redux/slices/navBarSlice";
import Catalog from "./Catalog";
import Favourites from "./Favourites";
import SegmentedButton from "../../ui/SegmentedButton";

export default function RecipesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabs = ["Каталог", "Мои рецепты", "Избранное"];

  useEffect(() => {
    dispatch(setActiveTab(0));
    if (window.location.search) {
      switch (window.location.search) {
        case "?my-recipes":
          setActiveTabIndex(1);
          break;
        case "?favourites":
          setActiveTabIndex(2);
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    switch (activeTabIndex) {
      case 1:
        navigate("?my-recipes");
        break;
      case 2:
        navigate("?favourites");
        break;
      default:
        navigate("");
        break;
    }
  }, [activeTabIndex]);

  return (
    <>
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
    </>
  );
}
