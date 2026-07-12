import { Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PlannerPage } from "./pages/PlannerPage";
import { PlanResultPage } from "./pages/PlanResultPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { DestinationDetailsPage } from "./pages/DestinationDetailsPage";
import { BusinessPortalPage } from "./pages/BusinessPortalPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { SavedTripsPage } from "./pages/SavedTripsPage";
import { TravelMapPage } from "./pages/TravelMapPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/planner/result" element={<PlanResultPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailsPage />} />
          <Route path="/saved-trips" element={<SavedTripsPage />} />
          <Route path="/map" element={<TravelMapPage />} />
          <Route path="/business" element={<BusinessPortalPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
