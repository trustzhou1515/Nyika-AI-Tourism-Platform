import { NavLink } from "react-router-dom";
import { Calculator, Compass, Heart, Home, Map } from "lucide-react";

const tabItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Explore", path: "/destinations", icon: Compass },
  { label: "Plan", path: "/planner", icon: Calculator, tone: "plan" },
  { label: "Map", path: "/map", icon: Map },
  { label: "Memories", path: "/saved-trips", icon: Heart }
];

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <strong>Explore Zimbabwe</strong>
          <p>Tourism budgeting, trip planning, booking and navigation.</p>
        </div>
      </footer>

      <nav className="bottomTabs">
        {tabItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [isActive ? "active" : "", item.tone === "plan" ? "planTab" : ""].filter(Boolean).join(" ") || undefined
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
