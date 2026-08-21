import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { RouteLoader } from "../components/common";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";

// Pages
// HomePage is loaded eagerly — it's the most common entry point, so it
// belongs in the initial bundle rather than costing every first-time
// visitor an extra network round-trip. Every other route is code-split
// so a visitor only downloads the JS for the page they actually open
// (previous single-bundle build was ~775KB for every route).
import HomePage from "../pages/home/HomePage";
const AboutPage = lazy(() => import("../pages/about/AboutPage"));
const WhatWeDoPage = lazy(() => import("../pages/what-we-do/WhatWeDoPage"));
const ProgramsPage = lazy(() => import("../pages/programs/ProgramsPage"));
const GalleryPage = lazy(() => import("../pages/gallery/GalleryPage"));
const DonatePage = lazy(() => import("../pages/donate/DonatePage"));
const VolunteerPage = lazy(() => import("../pages/volunteer/VolunteerPage"));
const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
const CheckInPage = lazy(() => import("../pages/checkin/CheckInPage"));
const CertificatePage = lazy(() => import("../pages/checkin/CertificatePage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));

/**
 * Application Routes Configuration
 * Centralized routing with layouts. Non-Home routes are code-split
 * (see imports above); Suspense shows RouteLoader while a chunk downloads.
 */
function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
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
          {/* CheckIn was previously a "no layout" route with no Navbar/
              Footer at all — a big part of why it felt disconnected from
              the rest of the site. It's reached via the main nav like
              everything else, so it belongs in the same layout. */}
          <Route path={ROUTES.CHECKIN} element={<CheckInPage />} />
        </Route>

        {/* Auth Routes (No Layout) */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        {/* Protected Routes (No Layout) */}
        <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
        {/* Certificate is deliberately outside PublicLayout — it's a
            print target, and printing the Navbar/Footer alongside it
            would look wrong on the printed page. */}
        <Route path={ROUTES.CERTIFICATE} element={<CertificatePage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
