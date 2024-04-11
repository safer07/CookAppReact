import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBarTabs, selectNavBar } from "../store/slices/navBarSlice";

type NavBarTab = {
  name: string;
  id: NavBarTabs;
  link: string;
  icon: string;
};

export default function NavBar() {
  const { activeTab } = useSelector(selectNavBar);
  const tabs: NavBarTab[] = [
    { name: "Рецепты", id: NavBarTabs.RECIPES, link: "/", icon: "fork" },
    {
      name: "Профиль",
      id: NavBarTabs.PROFILE,
      link: "/profile",
      icon: "user",
    },
  ];

  return (
    <div className="layout-grid">
      <nav className="layout-fullwidth grid grid-cols-2 border-y border-base-borders">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.link}
            className={`flex flex-col items-center py-1 ${activeTab === tab.id ? "text-primary" : "text-secondary-color"}`}
          >
            <svg className="size-3">
              <use href={`/images/icons.svg#${tab.icon}`} />
            </svg>
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
