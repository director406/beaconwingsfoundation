import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import Button from "./Button";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "What We Do", to: "/what-we-do" },
  { name: "Programs", to: "/programs" },
  { name: "Gallery", to: "/gallery" },
  { name: "Donate", to: "/donate" },
  { name: "Volunteer", to: "/volunteer" },
  { name: "Contact", to: "/contact" },
];

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
    localStorage.removeItem("iiwc_currentUser");
    setCurrentUser(null);
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="container-max flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="Beacon Wings Foundation" className="h-14 w-14 rounded-full object-cover shadow-sm" />
          <div>
            <p className="text-sm font-bold text-primary leading-tight">Beacon Wings Foundation</p>
            <p className="text-xs text-slate-500">Hope. Freedom. Empowerment.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
            <Link to="/login">
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
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-max flex flex-col gap-3 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
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
              <Link to="/login" onClick={() => setOpen(false)}>
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
