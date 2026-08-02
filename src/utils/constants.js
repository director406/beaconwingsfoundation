/**
 * Application Constants
 */

export const APP_INFO = {
  name: "Beacon Wings Foundation",
  shortName: "BWF",
  tagline: "Empowering Lives.",
  email: "director@beaconwingsfoundation.org",
  phone: "+91 7275982849",
  address: "E-49/5 First Floor Okhla Industrial Area Phase Il New Delhi Near - Delhi 110020",
};

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  WHAT_WE_DO: "/what-we-do",
  PROGRAMS: "/programs",
  GALLERY: "/gallery",
  DONATE: "/donate",
  VOLUNTEER: "/volunteer",
  CONTACT: "/contact",
  LEGAL: "/legal",
  CHECKIN: "/checkin",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN: "/admin",
};

export const NAV_LINKS = [
  { name: "Home", path: ROUTES.HOME },
  { name: "About", path: ROUTES.ABOUT },
  { name: "What We Do", path: ROUTES.WHAT_WE_DO },
  { name: "Programs", path: ROUTES.PROGRAMS },
  { name: "Gallery", path: ROUTES.GALLERY },
  { name: "Donate", path: ROUTES.DONATE },
  { name: "Volunteer", path: ROUTES.VOLUNTEER },
  { name: "Contact", path: ROUTES.CONTACT },
  { name: "CheckIn", path: ROUTES.CHECKIN },
];

export const FOCUS_AREAS = [
  {
    id: "education",
    title: "Education",
    description: "Scholarships, literacy, and digital learning initiatives.",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Health camps, preventive care, and awareness drives.",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Farmer training, sustainable methods, and livelihood support.",
  },
  {
    id: "legal-advisory",
    title: "Legal Advisory",
    description: "Guidance and legal aid for vulnerable communities.",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description: "Skill development and self-reliance programs for women.",
  },
];

export const USER_ROLES = {
  VOLUNTEER: "Volunteer",
  DONOR: "Donor",
  MEMBER: "Member",
  COORDINATOR: "Coordinator",
};

export const ADMIN_ROLES = [USER_ROLES.COORDINATOR, USER_ROLES.MEMBER];

export const DONATION_AMOUNTS = [500, 1000, 2500, 5000];

// Shared form-input styling — used by Volunteer, Contact, and CheckIn forms
// so every input on the site looks and behaves identically (border, focus
// ring, dark-mode colors). Previously copy-pasted per-page; consolidated
// here as part of the CheckIn page theme-alignment pass.
export const FORM_INPUT =
  "w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:placeholder:text-slate-500";

export const PROGRAMS = [
  "Rural Education Support",
  "Mobile Health Clinics",
  "Organic Farming Workshops",
  "Legal Rights Helpdesk",
  "Women Skill Development",
  "Youth Leadership Camps",
  "Nutrition Awareness Program",
  "Community Digital Literacy",
];
 