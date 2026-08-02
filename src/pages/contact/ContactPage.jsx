import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { APP_INFO, ROUTES, FORM_INPUT } from "../../utils/constants";
import { saveContactMessage } from "../../services/firestoreService";
import useDocumentMeta from "../../hooks/useDocumentMeta";

const INPUT = FORM_INPUT;

function ContactPage() {
  useDocumentMeta("Contact Us", "Get in touch with Beacon Wings Foundation.");
  const navigate = useNavigate();
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await saveContactMessage(form);
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Get in Touch</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-xl text-green-100">We are here to collaborate, support, and respond. We'll get back within 48 hours.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-max grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 py-20 text-center">
                <CheckCircle size={56} className="text-green-500" />
                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
                  Thank you, <strong>{form.name || "friend"}</strong>! Your message has been received. We'll reply to <strong>{form.email}</strong> within 48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Send us a message</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill in the form and we'll be in touch soon.</p>

                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                  {[
                    { name: "name",    label: "Full Name",    type: "text",  placeholder: "Priya Sharma",        span: 1 },
                    { name: "email",   label: "Email Address", type: "email", placeholder: "priya@example.com",  span: 1 },
                    { name: "subject", label: "Subject",       type: "text",  placeholder: "How can we help?",   span: 2 },
                  ].map(({ name, label, type, placeholder, span }) => (
                    <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{label} *</label>
                      <input name={name} type={type} required value={form[name]} onChange={handleChange} placeholder={placeholder} className={INPUT} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Message *</label>
                    <textarea name="message" rows={5} required value={form.message} onChange={handleChange}
                      placeholder="Tell us how we can collaborate..." className={INPUT + " resize-none"} />
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={loading}
                      className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60 active:scale-95">
                      {loading ? "Sending…" : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm">
              <h3 className="text-base font-bold text-primary">Contact Information</h3>
              <div className="mt-5 space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: APP_INFO.address },
                  { icon: Phone,  label: "Phone",   value: APP_INFO.phone   },
                  { icon: Mail,   label: "Email",   value: APP_INFO.email   },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30 text-primary">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
                      <p className="mt-0.5 text-sm text-slate-700 dark:text-slate-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm">
              <h3 className="text-base font-bold text-primary">Office Hours</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {[
                  ["Monday – Friday", "9:00 AM – 6:00 PM"],
                  ["Saturday",        "10:00 AM – 2:00 PM"],
                  ["Sunday",          "Closed"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span className={`font-medium ${hours === "Closed" ? "text-slate-400" : "text-slate-800 dark:text-slate-200"}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-primary p-7 text-white">
              <h3 className="font-bold">Quick Contact</h3>
              <p className="mt-2 text-sm text-green-200">Need an urgent response? Reach us directly via email or phone.</p>
              <a href={`mailto:${APP_INFO.email}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-400 transition">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
