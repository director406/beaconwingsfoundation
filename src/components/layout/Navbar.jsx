import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "../common";
import { NAV_LINKS, APP_INFO, ROUTES } from "../../utils/constants";
import { logoutUser } from "../../services/authService";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("iiwc_currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();
    
    // Listen for storage changes (login/logout)
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate(ROUTES.HOME);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="container-max flex h-20 items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt={APP_INFO.name} className="h-14 w-14 rounded-full object-cover shadow-sm" />
          <div>
            <p className="text-sm font-bold text-primary leading-tight">{APP_INFO.name}</p>
            <p className="text-xs text-slate-500">{APP_INFO.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl2 bg-green-50 px-3 py-2">
                <User size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl2 border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" className="px-4 py-2">
                Login
              </Button>
            </Link>
          )}
        </nav>

        <button
          className="rounded-lg p-2 text-primary lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav-panel" className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-max flex flex-col gap-3 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-green-50 text-primary" : "text-slate-600"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {currentUser ? (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
                  <User size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">{currentUser.name}</span>
                  <span className="ml-auto text-xs text-slate-500">({currentUser.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link to={ROUTES.LOGIN} onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
