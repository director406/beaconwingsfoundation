import { useState } from "react";
import { Copy, Check } from "lucide-react";
import useDocumentMeta from "../../hooks/useDocumentMeta";

const UPI_ID = "prachinirmal81@okicici";

function DonatePage() {
  useDocumentMeta("Donate", "Support our work with a direct contribution.");
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <section className="bg-primary py-14 text-white">
        <div className="container-max">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Make a Difference</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Donate</h1>
          <p className="mt-3 max-w-xl text-green-100">
            Your contribution — however big or small — directly enables us to reach more communities and transform more lives.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-max flex flex-col items-center">
          <div className="w-full max-w-sm rounded-2xl border border-primary/30 bg-white dark:bg-slate-800 p-8 shadow-lg text-center">
            <h2 className="text-xl font-bold text-primary">Scan &amp; Pay</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Use any UPI app — GPay, PhonePe, Paytm
            </p>

            <div className="mt-6 flex justify-center">
              <img
                src="/images/upi-qr.jpeg"
                alt="UPI QR Code — Beacon Wings Foundation"
                className="w-64 rounded-xl border border-slate-200 dark:border-slate-600 shadow-md"
              />
            </div>

            <p className="mt-5 text-base font-semibold text-slate-800 dark:text-slate-200">Prachi Nirmal</p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="rounded-lg bg-slate-100 dark:bg-slate-700 px-4 py-1.5 font-mono text-sm text-slate-700 dark:text-slate-200">
                {UPI_ID}
              </span>
              <button
                onClick={copyUPI}
                title="Copy UPI ID"
                className="rounded-lg border border-slate-200 dark:border-slate-600 p-1.5 text-slate-400 transition hover:text-primary hover:border-primary"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>

            {copied && (
              <p className="mt-2 text-xs text-green-600 dark:text-green-400">UPI ID copied!</p>
            )}

            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
              After payment, please share your transaction ID with us on WhatsApp or email for confirmation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default DonatePage;
