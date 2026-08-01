import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components";
import { loginUser } from "../../services/authService";
import { ROUTES, APP_INFO } from "../../utils/constants";

const INPUT = "w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:placeholder:text-slate-500";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await loginUser(formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      navigate(ROUTES.HOME);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden bg-primary p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white p-1.5 shadow-lg">
            <img src="/images/logo.jpeg" alt={APP_INFO.name} className="h-20 w-20 rounded-full object-cover" />
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-bold">{APP_INFO.name}</h1>
        <p className="mt-3 text-green-100">{APP_INFO.tagline}</p>
        <p className="mt-6 max-w-md text-sm text-green-100">Access your account to manage programs, community outreach, and dashboard insights.</p>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 sm:p-10">
        <div className="w-full max-w-md rounded-xl2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 shadow-soft sm:p-8">
          <button onClick={() => navigate(ROUTES.HOME)}
            className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition">
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h2 className="text-2xl font-bold text-primary">Login</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome back to {APP_INFO.shortName}</p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={INPUT} required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className={INPUT} required />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing In…" : "Sign In"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGNUP} className="font-semibold text-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
