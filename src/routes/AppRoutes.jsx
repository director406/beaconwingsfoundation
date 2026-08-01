import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";

// Pages
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import WhatWeDoPage from "../pages/what-we-do/WhatWeDoPage";
import ProgramsPage from "../pages/programs/ProgramsPage";
import GalleryPage from "../pages/gallery/GalleryPage";
import DonatePage from "../pages/donate/DonatePage";
import VolunteerPage from "../pages/volunteer/VolunteerPage";
import ContactPage from "../pages/contact/ContactPage";
import CheckInPage from "../pages/checkin/CheckInPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import LegalPage from "../pages/legal/LegalPage";

/**
 * Application Routes Configuration
 * Centralized routing with layouts
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Layout */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.WHAT_WE_DO} element={<WhatWeDoPage />} />
        <Route path={ROUTES.PROGRAMS} element={<ProgramsPage />} />
        <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
        <Route path={ROUTES.DONATE} element={<DonatePage />} />
        <Route path={ROUTES.VOLUNTEER} element={<VolunteerPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.LEGAL} element={<LegalPage />} />
      </Route>

      {/* Auth Routes (No Layout) */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

      {/* Protected Routes (No Layout) */}
      <Route path={ROUTES.CHECKIN} element={<CheckInPage />} />
      <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
    </Routes>
  );
}

export default AppRoutes;
