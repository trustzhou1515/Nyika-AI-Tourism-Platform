import { ArrowLeft, Calculator, Compass, Heart, Home, Map, MoreHorizontal, UserRound } from "lucide-react";
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


function ZimbabweBirdMark() {
  return (
    <svg className="zimbabweBirdMark" viewBox="0 0 96 120" aria-hidden="true" focusable="false">
      <path className="birdFill" d="M24 20c5-11 17-17 31-16 12 1 21 9 25 21l5 16v30c0 5-5 8-9 5L48 55 28 69c-5 4-12 0-12-6l2-27c.3-6 2-11 6-16Z" />
      <path className="birdFill" d="M21 28 5 30 4 22c0-6 4-10 10-11l21-2c7-1 13 4 13 11v10l-27-2Z" />
      <path className="birdStroke" d="M25 18c7-9 18-14 31-13 11 1 20 9 23 20l5 17v29c0 5-5 8-9 5L48 55 28 69c-5 4-12 0-12-6l2-27c.3-7 3-13 7-18Z" />
      <path className="birdStroke" d="M22 28 5 30 4 22c0-6 4-10 10-11l22-2c7-.6 13 4 13 11v10l-27-2Z" />
      <circle className="birdEye" cx="51" cy="21" r="7" />
      <path className="birdStroke" d="M45 36 28 69" />
      <path className="birdWing" d="M45 45c-4 18 8 29 31 29L45 45Z" />
      <path className="birdStroke" d="M44 45c-4 18 8 29 31 29" />
      <path className="birdStroke" d="M37 57c-2 11 3 18 13 22" />
      <path className="birdFill" d="M18 68 8 82c-7 10-8 18-3 25l12-17 5 26h55l5-30-15-12H37c-9 0-16-2-19-6Z" />
      <path className="birdStroke" d="M18 68 8 82c-7 10-8 18-3 25l12-17 5 26h55l5-30-15-12H37c-9 0-16-2-19-6Z" />
      <path className="birdStroke" d="M18 86h63" />
      <path className="birdStroke" d="M21 101h57" />
      <path className="birdPattern" d="M18 88h60l-8 8-8-8-8 8-8-8-8 8-8-8-8 8-4-4" />
      <circle className="birdCutout" cx="40" cy="77" r="7" />
      <circle className="birdCutout" cx="61" cy="77" r="7" />
    </svg>
  );
}

const sidebarItems: SidebarItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Explore", path: "/destinations", icon: Compass },
  { label: "Plan", path: "/planner", icon: Calculator, tone: "plan" },
  { label: "Map", path: "/map", icon: Map },
  { label: "Memories", path: "/saved-trips", icon: Heart },
  { label: "Login", path: "/login", icon: UserRound }
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
          <div className="desktopSidebarBrand nyikaDesktopBrand" aria-label="Nyika AI Explore Zimbabwe">
            <div>
              <strong>Nyika AI</strong>
              <small>Explore Zimbabwe</small>
            </div>
          </div>

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

        <div className="desktopSidebarBottom">
          <div className="nyikaMeaningCard" aria-label="Nyika meaning">
            <span className="nyikaMeaningBird">
              <img src="/images/nyika-bird-reference.png" alt="" />
            </span>
            <div>
              <strong>Nyika means country or nation.</strong>
              <p>Zimbabwe, discovered with care.</p>
            </div>
          </div>

          <div className="desktopSidebarTrending">
            <span>Trending now</span>
            <NavLink to="/destinations/victoria-falls">Victoria Falls</NavLink>
            <NavLink to="/destinations/lake-kariba">Lake Kariba</NavLink>
            <NavLink to="/destinations/nyanga">Nyanga</NavLink>
          </div>
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
