import { FileText, Download, Eye } from "lucide-react";
import SectionWrapper from "../../components/common/SectionWrapper";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { APP_INFO } from "../../utils/constants";

const documents = [
  {
    title: "Certificate of Incorporation",
    description: "Official government-issued certificate confirming the legal registration of Beacon Wings Foundation as a Section 8 company / non-profit organization.",
    file: "Certificate Of Incorporation'.pdf",
  },
  {
    title: "Memorandum of Association (MOA)",
    description: "Defines the objectives, scope, and powers of Beacon Wings Foundation as laid down at the time of incorporation.",
    file: "MOA.pdf",
  },
  {
    title: "Articles of Association (AOA)",
    description: "Governs the internal management, rules, and administration of Beacon Wings Foundation.",
    file: "AOA (1).pdf",
  },
  // {
  //   title: "Board Resolution",
  //   description: "Official resolution passed by the Board of Directors authorizing key decisions and activities of the organization.",
  //   file: "Board Resolution.pdf",
  // },
  {
    title: "NITI Aayog Certificate",
    description: "NGO Darpan registration certificate issued by NITI Aayog, Government of India, confirming our enrollment as a registered NGO.",
    file: "Darpan Certificate.pdf",
  },
  {
    title: "Master Data",
    description: "Organization's master data as registered with the Ministry of Corporate Affairs, including registered address, directors, and official identifiers.",
    file: "Master Data.pdf",
  },
];

function LegalPage() {
  useDocumentMeta("Legal & Policies", "Our registration details and legal policies.");
  return (
    <SectionWrapper className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Transparency &amp; Compliance
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          Legal Documents &amp; Notices
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Beacon Wings Foundation is committed to transparency. Below are our official
          registration documents, certifications, and policy notices.
        </p>
      </div>

      {/* Document cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map(({ title, description, file }) => {
          const url = `/documents/${file}`;
          return (
            <div
              key={file}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                >
                  <Eye size={13} /> View
                </a>
                <a
                  href={url}
                  download
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
                >
                  <Download size={13} /> Download
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500">
        For queries regarding any of the above documents, please contact us at{" "}
        <a href={`mailto:${APP_INFO.email}`} className="underline hover:text-primary">
          {APP_INFO.email}
        </a>
        .
      </p>
    </SectionWrapper>
  );
}

export default LegalPage;
