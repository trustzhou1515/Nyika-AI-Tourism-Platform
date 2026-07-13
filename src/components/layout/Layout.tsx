import { ArrowLeft, Calculator, Compass, Heart, Home, Map, MoreHorizontal } from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PrivacyConsent } from "../compliance/PrivacyConsent";

type SidebarItem = {
  label: string;
  path: string;
  icon: typeof Home;
  tone?: "plan";
};

const sidebarItems: SidebarItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Explore", path: "/destinations", icon: Compass },
  { label: "Plan", path: "/planner", icon: Calculator, tone: "plan" },
  { label: "Map", path: "/map", icon: Map },
  { label: "Memories", path: "/saved-trips", icon: Heart }
];

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/planner/result";

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <div className="appDesktopShell">
      <aside className="desktopSidebar" aria-label="Primary navigation">
        <div>
          <strong className="desktopSidebarBrand">Explore Zimbabwe</strong>

          <nav className="desktopSidebarNav">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [isActive ? "active" : "", item.tone === "plan" ? "planNav" : ""].filter(Boolean).join(" ") || undefined
                  }
                >
                  <Icon size={27} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="desktopSidebarTrending">
          <span>Trending now</span>
          <NavLink to="/destinations/victoria-falls">Victoria Falls</NavLink>
          <NavLink to="/destinations/lake-kariba">Lake Kariba</NavLink>
          <NavLink to="/destinations/nyanga">Nyanga</NavLink>
        </div>
      </aside>

      <div className="appDesktopMain">
      <Navbar />
        <div className="mobileTrendingStrip" aria-label="Trending destinations">
          <span>Trending now</span>
          <NavLink to="/destinations/victoria-falls">Victoria Falls</NavLink>
          <NavLink to="/destinations/lake-kariba">Lake Kariba</NavLink>
          <NavLink to="/destinations/nyanga">Nyanga</NavLink>
        </div>
        <button className="desktopMoreButton" type="button" aria-label="More options">
          <MoreHorizontal size={26} />
        </button>
      <main className={showBackButton ? "mainWithBack" : undefined}>
        {showBackButton && (
          <div className="routeBackShell">
            <div className="container">
              <button className="routeBackButton" type="button" onClick={handleBack}>
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          </div>
        )}
        <Outlet />
      </main>
      <PrivacyConsent />
      <Footer />
      </div>
    </div>
  );
}
