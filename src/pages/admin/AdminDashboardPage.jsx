import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, MessageSquare, LogOut, Inbox } from "lucide-react";
import { Card } from "../../components";
import { getCurrentUser, isAuthenticated, logoutUser } from "../../services/authService";
import { getAllVolunteers, getAllContacts } from "../../services/firestoreService";
import { ROUTES, APP_INFO, ADMIN_ROLES } from "../../utils/constants";
import useDocumentMeta from "../../hooks/useDocumentMeta";

function SkeletonRow({ cols }) {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-700">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-2 py-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </td>
      ))}
    </tr>
  );
}

function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <Icon size={40} className="text-slate-300 dark:text-slate-600" />
      <p className="mt-3 font-semibold text-slate-600 dark:text-slate-300">{title}</p>
      <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{subtitle}</p>
    </div>
  );
}

function AdminDashboardPage() {
  useDocumentMeta("Admin Dashboard", "Manage volunteer applications and contact messages.");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [volunteers,  setVolunteers]  = useState([]);
  const [contacts,    setContacts]    = useState([]);
  const [activeTab,   setActiveTab]   = useState("volunteers");
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) { navigate(ROUTES.LOGIN); return; }
    const user = getCurrentUser();
    if (!user || !ADMIN_ROLES.includes(user.role)) { navigate(ROUTES.HOME); return; }
    setCurrentUser(user);

    Promise.all([getAllVolunteers(), getAllContacts()])
      .then(([vols, msgs]) => { setVolunteers(vols); setContacts(msgs); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate(ROUTES.HOME);
  };

  const pending = volunteers.filter(v => v.status === 'pending').length;
  const unread  = contacts.filter(c => !c.isRead).length;

  const stats = [
    ["Volunteer Applications", volunteers.length],
    ["Pending Review",         pending],
    ["Contact Messages",       contacts.length],
    ["Unread Messages",        unread],
  ];

  const navItems = [
    { label: "Volunteers", tab: "volunteers", icon: Users },
    { label: "Messages",   tab: "contacts",   icon: MessageSquare },
  ];

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar — light, bordered, matching the rest of the site instead
            of a solid dark-green block. */}
        <aside className="flex flex-col rounded-xl2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-soft lg:h-fit lg:sticky lg:top-6">
          <h2 className="text-xl font-bold text-primary">{APP_INFO.shortName} Admin</h2>
          <div className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm">
            <p className="text-slate-500 dark:text-slate-400">Logged in as:</p>
            <p className="font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser.role}</p>
          </div>

          <nav className="mt-6 space-y-1 text-sm">
            {navItems.map(({ label, tab, icon: Icon }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <Icon size={16} />
                {label}
                {label === "Messages" && unread > 0 && (
                  <span className={`ml-auto rounded-full px-1.5 py-0.5 text-xs font-bold ${
                    activeTab === tab ? "bg-white/25 text-white" : "bg-accent text-white"
                  }`}>{unread}</span>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2.5 text-sm font-medium text-red-700 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-900/40"
          >
            <LogOut size={16} /> Logout
          </button>
        </aside>

        {/* Main content */}
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Welcome back, {currentUser.name}!</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([label, value]) => (
              <Card key={label}>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                {loading ? (
                  <div className="mt-2 h-8 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                ) : (
                  <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
                )}
              </Card>
            ))}
          </div>

          {/* Volunteer Applications table */}
          {activeTab === "volunteers" && (
            <Card>
              <h3 className="text-lg font-semibold text-primary">Volunteer Applications</h3>
              {!loading && volunteers.length === 0 ? (
                <EmptyState icon={Users} title="No applications yet" subtitle="New volunteer applications will show up here." />
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Email</th>
                        <th className="px-2 py-2">City</th>
                        <th className="px-2 py-2">Area</th>
                        <th className="px-2 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                        : volunteers.map((v) => (
                          <tr key={v.id} className="border-b border-slate-100 dark:border-slate-700">
                            <td className="px-2 py-3 text-slate-700 dark:text-slate-200">{v.name}</td>
                            <td className="px-2 py-3 text-slate-700 dark:text-slate-200">{v.email}</td>
                            <td className="px-2 py-3 text-slate-500 dark:text-slate-400">{v.city}</td>
                            <td className="px-2 py-3 text-slate-500 dark:text-slate-400">{v.area}</td>
                            <td className="px-2 py-3">
                              <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                                v.status === 'approved'
                                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                                  : v.status === 'rejected'
                                  ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300'
                              }`}>{v.status ?? 'pending'}</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          {/* Contact Messages table */}
          {activeTab === "contacts" && (
            <Card>
              <h3 className="text-lg font-semibold text-primary">Contact Messages</h3>
              {!loading && contacts.length === 0 ? (
                <EmptyState icon={Inbox} title="No messages yet" subtitle="Messages submitted through the Contact page will show up here." />
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                        <th className="px-2 py-2">Name</th>
                        <th className="px-2 py-2">Email</th>
                        <th className="px-2 py-2">Subject</th>
                        <th className="px-2 py-2">Read</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                        : contacts.map((c) => (
                          <tr key={c.id} className="border-b border-slate-100 dark:border-slate-700">
                            <td className="px-2 py-3 font-medium text-slate-700 dark:text-slate-200">{c.name}</td>
                            <td className="px-2 py-3 text-slate-700 dark:text-slate-200">{c.email}</td>
                            <td className="px-2 py-3 text-slate-500 dark:text-slate-400">{c.subject}</td>
                            <td className="px-2 py-3">
                              {c.isRead
                                ? <span className="text-xs text-slate-400 dark:text-slate-500">Read</span>
                                : <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-medium text-accent">New</span>}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
