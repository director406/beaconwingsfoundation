import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";
import { APP_INFO, ROUTES } from "../../utils/constants";
import { isAuthenticated } from "../../services/authService";
import useDocumentMeta from "../../hooks/useDocumentMeta";

/**
 * CertificatePage — standalone (no Navbar/Footer) so it prints cleanly.
 * Expects { volunteerName, badgeName, badgeIcon, totalDrives } via router
 * state (passed from CheckInPage when a volunteer has earned a badge).
 * Falls back to redirecting to /checkin if opened directly with no state
 * — a certificate with no volunteer data isn't useful to show.
 */
function CertificatePage() {
  useDocumentMeta("Your Certificate", "Certificate of appreciation for volunteering with Beacon Wings Foundation.");
  const location = useLocation();
  const navigate = useNavigate();
  const { volunteerName, badgeName, badgeIcon, totalDrives } = location.state || {};

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(ROUTES.LOGIN);
      return;
    }
    if (!volunteerName || !badgeName) {
      navigate(ROUTES.CHECKIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!volunteerName || !badgeName) return null;

  const issuedDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <div className="container-max flex items-center justify-between print:hidden">
        <Link to={ROUTES.CHECKIN} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft size={16} /> Back to Check-In
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <Printer size={16} /> Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto mt-8 max-w-3xl print:mt-0">
        <div className="relative overflow-hidden rounded-2xl border-8 border-primary bg-white p-12 shadow-xl print:rounded-none print:border-4 print:shadow-none">
          {/* Corner ornament */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10" />
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-primary/10" />

          <div className="relative text-center">
            <img src="/images/logo.jpeg" alt={APP_INFO.name} className="mx-auto h-20 w-20 rounded-full object-cover shadow-sm" />
            <p className="mt-3 text-lg font-bold text-primary">{APP_INFO.name}</p>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-accent">Certificate of Appreciation</p>
            <p className="mt-6 text-sm text-slate-500">This certificate is proudly presented to</p>
            <p className="mt-3 font-serif text-4xl font-bold text-slate-900">{volunteerName}</p>

            <p className="mx-auto mt-6 max-w-lg text-slate-600">
              In recognition of dedication and service, having earned the{" "}
              <span className="font-semibold text-primary">{badgeIcon} {badgeName}</span> badge
              after completing <span className="font-semibold text-primary">{totalDrives}</span>{" "}
              volunteer {totalDrives === 1 ? "activity" : "activities"} with {APP_INFO.name}.
            </p>

            <div className="mt-10 flex items-end justify-between border-t border-slate-200 pt-6 text-left">
              <div>
                <p className="text-sm font-semibold text-slate-700">{issuedDate}</p>
                <p className="text-xs text-slate-400">Date Issued</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-lg italic text-slate-700">{APP_INFO.name}</p>
                <p className="text-xs text-slate-400">Beacon Wings Foundation</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 print:hidden">
          This certificate is generated from your volunteer activity record. Use "Print / Save as PDF" above to download it.
        </p>
      </div>
    </div>
  );
}

export default CertificatePage;
