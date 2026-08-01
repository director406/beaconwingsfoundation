import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Public Layout Component
 * Wraps public pages with consistent header and footer
 */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
