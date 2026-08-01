import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components";
import { registerUser } from "../../services/authService";
import { ROUTES, APP_INFO, USER_ROLES } from "../../utils/constants";

const INPUT = "rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:placeholder:text-slate-500";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "", password: "", confirmPassword: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side checks before hitting the API
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); return; }
    if (!formData.role) { setError("Please select a role."); return; }

    setLoading(true);
    const result = await registerUser(formData);

    if (result.success) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setLoading(false);
    setError(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 sm:p-10">
      <div className="w-full max-w-3xl rounded-xl2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 shadow-soft sm:p-8">
        <button onClick={() => navigate(ROUTES.HOME)}
          className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition">
          <ArrowLeft size={16} /> Back to Home
        </button>
        <h2 className="text-2xl font-bold text-primary">Create Account</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Register to collaborate with {APP_INFO.shortName}</p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          {[
            { name: "name",            type: "text",     ph: "Full Name"                   },
            { name: "email",           type: "email",    ph: "Email"                       },
            { name: "phone",           type: "tel",      ph: "Phone"                       },
            { name: "password",        type: "password", ph: "Password (min 6 characters)" },
            { name: "confirmPassword", type: "password", ph: "Confirm Password"            },
          ].map(({ name, type, ph }) => (
            <input key={name} type={type} name={name} value={formData[name]} onChange={handleChange}
              placeholder={ph} className={INPUT} required />
          ))}
          <select name="role" value={formData.role} onChange={handleChange}
            className={INPUT + " col-span-1 sm:col-auto"} required>
            <option value="">Select Role</option>
            {/* Public signup can only self-select non-privileged roles.
                Coordinator/Member (admin-dashboard-eligible roles) are granted
                manually by an existing admin — never selectable at signup. */}
            {[USER_ROLES.VOLUNTEER, USER_ROLES.DONOR].map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <div className="sm:col-span-2">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="font-semibold text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
