import emailjs from "@emailjs/browser";

/**
 * Email notifications — sends admin alerts (new volunteer application, new
 * contact message) to director@beaconwingsfoundation.org via EmailJS.
 *
 * Deliberately client-side: a "real" backend-triggered email (Firebase
 * Cloud Functions + a Trigger Email extension) requires the Blaze
 * (pay-as-you-go) plan, which is explicitly deferred for now. EmailJS
 * sends transactional emails directly from the browser via a REST call,
 * no backend required, free tier covers low volume.
 *
 * Requires 3 values from a free EmailJS account (emailjs.com), set as
 * VITE_EMAILJS_* build-time env vars — same pattern as the Firebase
 * config. Until they're set, this no-ops with a console warning instead
 * of throwing, so a missing config can never break the volunteer/contact
 * forms themselves (this is exactly the failure mode that took the site
 * down once before with Firebase — not repeating it here).
 */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

if (!isConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    "[emailService] EmailJS is not configured — admin email notifications " +
    "are disabled. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, " +
    "and VITE_EMAILJS_PUBLIC_KEY to enable them. The site itself is unaffected."
  );
}

/**
 * Sends an admin notification email. Never throws — a failed/unconfigured
 * email should never block a volunteer application or contact message
 * from being saved, since Firestore is the source of truth, not email.
 *
 * @param {"volunteer"|"contact"} type
 * @param {object} data - form fields to include in the notification
 */
export async function notifyAdmin(type, data) {
  if (!isConfigured) return;

  const subjectMap = {
    volunteer: "New Volunteer Application",
    contact: "New Contact Message",
  };

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: "director@beaconwingsfoundation.org",
        subject: subjectMap[type] || "New Website Submission",
        submission_type: type,
        message: Object.entries(data)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n"),
      },
      { publicKey: PUBLIC_KEY }
    );
  } catch (err) {
    // Log only — see docstring above for why this must never throw.
    // eslint-disable-next-line no-console
    console.error("[emailService] Failed to send admin notification:", err);
  }
}
