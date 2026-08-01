import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Heart, Users, Clock, Award } from "lucide-react";
import { saveVolunteerApplication } from "../../services/firestoreService";
import { ROUTES } from "../../utils/constants";

const INPUT = "w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:placeholder:text-slate-500";

const perks = [
  { icon: Heart,  title: "Make Real Impact",    desc: "Directly serve communities and see the change you create." },
  { icon: Users,  title: "Join a Family",       desc: "Become part of 1,200+ passionate volunteers across India." },
  { icon: Clock,  title: "Flexible Commitment", desc: "Contribute as many or as few hours as your schedule allows." },
  { icon: Award,  title: "Earn Badges",         desc: "Track your volunteer hours and unlock achievement badges." },
];

function VolunteerPage() {
  const navigate = useNavigate();
  const [form, setForm]         = useState({ name: "", email: "", phone: "", city: "", area: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await saveVolunteerApplication(form);
      setSubmitted(true);
      setTimeout(() => navigate(ROUTES.HOME), 3000);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-primary py-14 text-white">
        <div className="container-max">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Get Involved</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Volunteer With Us</h1>
          <p className="mt-3 max-w-xl text-green-100">
            Join our growing family of volunteers and contribute your time, skills, and passion toward transforming communities across India.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-12">
        <div className="container-max grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="container-max">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 py-20 text-center">
                <CheckCircle size={56} className="text-green-500" />
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Welcome to the family, {form.name.split(" ")[0]}!</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
                  Your application is saved. Our team in <strong>{form.city || "your city"}</strong> will reach out to <strong>{form.email}</strong> within 3 business days.
                  {" "}A confirmation email has been sent.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", city: "", area: "", message: "" }); }}
                  className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Register Another
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Register as a Volunteer</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Takes less than 2 minutes. We'll be in touch!</p>

                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                  {[
                    { name: "name",  type: "text",  label: "Full Name *",      ph: "Rahul Verma",       span: 1 },
                    { name: "email", type: "email", label: "Email Address *",   ph: "rahul@example.com", span: 1 },
                    { name: "phone", type: "tel",   label: "Phone Number *",    ph: "98765 43210",       span: 1 },
                    { name: "city",  type: "text",  label: "City *",            ph: "New Delhi",         span: 1 },
                  ].map(({ name, type, label, ph, span }) => (
                    <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{label}</label>
                      <input name={name} type={type} required value={form[name]} onChange={handleChange} placeholder={ph} className={INPUT} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Area of Interest *</label>
                    <select name="area" required value={form.area} onChange={handleChange} className={INPUT}>
                      <option value="">Select an area…</option>
                      {["Education", "Healthcare", "Agriculture", "Legal Advisory", "Women Empowerment", "General / Any"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">How would you like to contribute?</label>
                    <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                      placeholder="Tell us your skills, availability, or anything else…"
                      className={INPUT + " resize-none"} />
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={loading}
                      className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60 active:scale-95">
                      {loading ? "Registering…" : "Register as Volunteer"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default VolunteerPage;
