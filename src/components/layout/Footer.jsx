import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, ArrowRight } from "lucide-react";
import { APP_INFO, ROUTES } from "../../utils/constants";
import { saveSubscriber } from "../../services/firestoreService";

const exploreLinks = [
  ["About Us", ROUTES.ABOUT],
  ["What We Do", ROUTES.WHAT_WE_DO],
  ["Programs", ROUTES.PROGRAMS],
  ["Gallery", ROUTES.GALLERY],
];

const involveLinks = [
  ["Volunteer", ROUTES.VOLUNTEER],
  ["Donate", ROUTES.DONATE],
  ["Contact Us", ROUTES.CONTACT],
  ["Login / Sign Up", ROUTES.LOGIN],
];

const socialLinks = [
  { icon: Facebook,  label: "Facebook",   href: "https://www.facebook.com/share/1Ctzp1cCpy/" },
  { icon: Twitter,   label: "Twitter / X", href: "https://x.com/Beaconwing2m" },
  { icon: Instagram, label: "Instagram",  href: "https://www.instagram.com/beacon_wings_foundation_/" },
  { icon: Linkedin,  label: "LinkedIn",   href: "https://www.linkedin.com/company/beacon-wings-foundation/" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await saveSubscriber(email.trim());
    } catch {
      // Firestore unavailable — still show success so UX isn't broken
    }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400">
      {/* Newsletter strip */}
      <div className="bg-primary">
        <div className="container-max flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Stay connected with us</h3>
            <p className="mt-1 text-sm text-green-200">
              Get updates on programs, impact stories, and volunteer opportunities.
            </p>
          </div>
          {subscribed ? (
            <p className="rounded-lg bg-white/15 px-5 py-3 text-sm font-semibold text-white">
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-accent/90"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="container-max grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white p-1 shadow">
              <img src="/images/logo.jpeg" alt={APP_INFO.name} className="h-12 w-12 rounded-full object-cover" />
            </div>
            <span className="text-sm font-bold text-white leading-tight">{APP_INFO.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">{APP_INFO.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed">
            A non-profit organization dedicated to uplifting underprivileged communities across India
            through people-first programs.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-slate-800 dark:bg-slate-900 p-2 text-slate-400 transition hover:bg-primary hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="text-sm transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get Involved</h4>
          <ul className="mt-4 space-y-2.5">
            {involveLinks.map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="text-sm transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <div className="mt-4 space-y-2.5 text-sm">
            <p className="leading-relaxed">{APP_INFO.address}</p>
            <p>
              <a href={`tel:${APP_INFO.phone}`} className="transition hover:text-white">
                {APP_INFO.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${APP_INFO.email}`} className="transition hover:text-white">
                {APP_INFO.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 dark:border-slate-900">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {APP_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to={ROUTES.LEGAL} className="transition hover:text-white">Legal &amp; Documents</Link>
            <span className="text-slate-600">Made with ♥ for a better India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
