import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNavBar } from "../redux/slices/navBarSlice";

export default function NavBar() {
  const { activeTab, show } = useSelector(selectNavBar);
  const tabs = [
    { name: "Рецепты", link: "/", icon: "/images/icons.svg#fork" },
    { name: "Профиль", link: "/profile", icon: "/images/icons.svg#user" },
  ];

  if (!show) return;

  return (
    <div className="layout-grid">
      <nav className="layout-fullwidth grid grid-cols-2 border-y border-base-borders">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.link}
            className={`flex flex-col items-center py-1 ${activeTab === index ? "text-primary" : "text-secondary-color"}`}
          >
            <svg className="size-3">
              <use href={tab.icon} />
            </svg>
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
