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
  CHECKIN: "/checkin",
  CERTIFICATE: "/certificate",
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

// The organization's actual 3 registered focus areas, per the Certificate
// of Incorporation (Child Care, Women Empowerment, Old Age People Care).
// Previously this listed 5 generic categories (Education, Healthcare,
// Agriculture, Legal Advisory, Women Empowerment) inherited from the
// template this site was built from — none of which matched what BWF is
// actually registered to do except Women Empowerment.
export const FOCUS_AREAS = [
  {
    id: "child-care",
    title: "Child Care",
    subtitle: "Education & Upliftment",
    description: "Scholarships, learning support, and holistic upliftment programs for underprivileged children.",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    description: "Vocational training, self-help groups, and skill-building that help women achieve independence.",
  },
  {
    id: "old-age-care",
    title: "Old Age People Care",
    description: "Companionship, health support, and dignified care programs for the elderly in our communities.",
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare",
    description: "Rescue, care, and welfare initiatives for animals in need across the communities we serve.",
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
  "Scholarship & Learning Support",
  "Community Learning Centers",
  "Nutrition & Wellbeing for Children",
  "Vocational Skill Development",
  "Self-Help Group Formation",
  "Financial Literacy Workshops",
  "Elderly Companionship Program",
  "Senior Health & Wellness Camps",
];
 