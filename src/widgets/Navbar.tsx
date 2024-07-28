import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavBarTabs = "recipes" | "profile";

type NavBarTab = {
  name: string;
  id: NavBarTabs;
  link: string;
  icon: string;
};

export default function NavBar(): JSX.Element {
  const pathname: string = useLocation().pathname;
  const [activeTab, setActiveTab] = useState("");
  const tabs: NavBarTab[] = [
    { name: "Рецепты", id: "recipes", link: "/", icon: "fork" },
    {
      name: "Профиль",
      id: "profile",
      link: "/profile",
      icon: "user",
    },
  ];

  useEffect(() => {
    if (pathname === "/" || pathname.startsWith("/recipes"))
      setActiveTab("recipes");
    else if (pathname.startsWith("/profile")) setActiveTab("profile");
  }, [pathname]);

  // TODO:
  // нужно объединять для recipe/.. и recipes (через NavLink)
  // function getClass(isActive: boolean): string {
  //   return `flex flex-col items-center py-1 transition-colors duration-300 ${isActive ? "cursor-default text-primary" : "text-secondary-color hover-hover:hover:text-primary"}`;
  // }
  // ({isActive}) => getClass(isActive)

  return (
    <div className="layout-grid">
      <nav className="layout-fullwidth grid grid-cols-2 border-y border-base-borders">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.link}
            className={`flex flex-col items-center py-1 transition-colors duration-300 ${activeTab === tab.id ? "cursor-default text-primary" : "text-secondary-color hover-hover:hover:text-primary"}`}
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
