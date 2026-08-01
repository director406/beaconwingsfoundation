import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components";
import { getCurrentUser, isAuthenticated } from "../../services/authService";
import { getAllVolunteers, getAllContacts } from "../../services/firestoreService";
import { ROUTES, APP_INFO, ADMIN_ROLES } from "../../utils/constants";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser]       = useState(null);
  const [volunteers,  setVolunteers]         = useState([]);
  const [contacts,    setContacts]           = useState([]);
  const [activeTab,   setActiveTab]          = useState("volunteers");
  const [loading,     setLoading]            = useState(true);

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

  const pending   = volunteers.filter(v => v.status === 'pending').length;
  const unread    = contacts.filter(c => !c.isRead).length;

  const stats = [
    ["Volunteer Applications", volunteers.length],
    ["Pending Review",         pending],
    ["Contact Messages",       contacts.length],
    ["Unread Messages",        unread],
  ];

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-xl2 bg-primary p-5 text-white shadow-soft">
          <h2 className="text-xl font-bold">{APP_INFO.shortName} Admin</h2>
          <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm">
            <p className="text-green-200">Logged in as:</p>
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-xs text-green-200">{currentUser.role}</p>
          </div>
          <nav className="mt-6 space-y-1 text-sm">
            {[
              { label: "Dashboard",   tab: "volunteers" },
              { label: "Volunteers",  tab: "volunteers" },
              { label: "Messages",    tab: "contacts"   },
            ].map(({ label, tab }, idx) => (
              <button key={label}
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-lg px-3 py-2 text-left transition ${activeTab === tab && idx !== 0 ? "bg-white/20" : idx === 0 ? "bg-white/20" : "hover:bg-white/10"}`}>
                {label}
                {label === "Messages" && unread > 0 && (
                  <span className="ml-2 rounded-full bg-accent px-1.5 py-0.5 text-xs font-bold text-white">{unread}</span>
                )}
              </button>
            ))}
          </nav>
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
                <p className="mt-2 text-2xl font-bold text-primary">{loading ? "…" : value}</p>
              </Card>
            ))}
          </div>

          {/* Volunteer Applications table */}
          {activeTab === "volunteers" && (
            <Card>
              <h3 className="text-lg font-semibold text-primary">Volunteer Applications</h3>
              {loading ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading…</p>
              ) : volunteers.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No applications yet.</p>
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
                      {volunteers.map((v) => (
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
              {loading ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading…</p>
              ) : contacts.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No messages yet.</p>
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
                      {contacts.map((c) => (
                        <tr key={c.id} className="border-b border-slate-100 dark:border-slate-700">
                          <td className="px-2 py-3 font-medium text-slate-700 dark:text-slate-200">{c.name}</td>
                          <td className="px-2 py-3 text-slate-700 dark:text-slate-200">{c.email}</td>
                          <td className="px-2 py-3 text-slate-500 dark:text-slate-400">{c.subject}</td>
                          <td className="px-2 py-3">
                            {c.isRead
                              ? <span className="text-xs text-slate-400">Read</span>
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
