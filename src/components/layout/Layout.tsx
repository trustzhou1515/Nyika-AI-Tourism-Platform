import { ArrowLeft } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PrivacyConsent } from "../compliance/PrivacyConsent";

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
    <>
      <Navbar />
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
    </>
  );
}
