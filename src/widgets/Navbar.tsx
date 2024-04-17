import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavBarTabs = "recipes" | "profile";

type NavBarTab = {
  name: string;
  id: NavBarTabs;
  link: string;
  icon: string;
};

export default function NavBar() {
  const pathname = useLocation().pathname;
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
    if (pathname === "/" || pathname.startsWith("/recipe"))
      setActiveTab("recipes");
    else if (pathname.startsWith("/profile")) setActiveTab("profile");
  }, [pathname]);

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
