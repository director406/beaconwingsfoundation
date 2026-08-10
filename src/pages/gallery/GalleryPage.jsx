import { useState } from "react";
import { X } from "lucide-react";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { PageHeader } from "../../components";

const galleryImages = [
  { url: "/images/activity-notebook-distribution-1.jpeg", title: "Notebook Distribution Drive",    category: "Child Care"  },
  { url: "/images/activity-notebook-distribution-2.jpeg", title: "Books & Smiles",                 category: "Child Care"  },
  { url: "/images/activity-notebook-distribution-3.jpeg", title: "Ready to Learn",                 category: "Child Care"  },
  { url: "/images/activity-notebook-distribution-4.jpeg", title: "Celebrating New Notebooks",       category: "Child Care"  },
  { url: "/images/activity-snack-distribution.jpeg",      title: "Snack Distribution Drive",        category: "Events"      },
  { url: "/images/activity-birthday-celebration-1.jpeg",  title: "Birthday Celebration with Kids",  category: "Events"      },
  { url: "/images/activity-birthday-celebration-2.jpeg",  title: "Celebrating Together",            category: "Events"      },
  { url: "/images/activity-group-game.jpeg",              title: "Fun & Games Session",             category: "Community"   },
  { url: "/images/activity-icebreaker-game.jpeg",         title: "Icebreaker Activity",             category: "Community"   },
  { url: "/images/community-team-selfie.jpeg",             title: "Team & Community Connect",        category: "Community"   },
  // Health Camp — organized 5 July 2026, Lucknow City. Led by Director
  // Prachi Nirmal, assisted by Akansha Srivastav; doctors on site
  // distributed medicines, conducted full check-ups, and ran lab tests.
  // All 20 submitted photos are used except 2 (originally photos 14 and
  // 18 as shown in chat) that were excluded for genuine quality reasons
  // — both are dominated by dark tent-canopy fabric covering most of
  // the frame. Every file below was individually viewed and verified
  // to correctly match its filename before being added — an earlier
  // version of this section had several images mismatched to the
  // wrong titles, which is what prompted this rebuild.
  { url: "/images/healthcamp-01.jpeg", title: "Our Health Camp Team — Lucknow",     category: "Healthcare" },
  { url: "/images/healthcamp-02.jpeg", title: "Team Ready to Serve",                category: "Healthcare" },
  { url: "/images/healthcamp-03.jpeg", title: "Blood Pressure Check-up",            category: "Healthcare" },
  { url: "/images/healthcamp-04.jpeg", title: "Health Camp Consultation",           category: "Healthcare" },
  { url: "/images/healthcamp-05.jpeg", title: "Doctors Attending to Patients",      category: "Healthcare" },
  { url: "/images/healthcamp-06.jpeg", title: "Community Health Check-up",          category: "Healthcare" },
  { url: "/images/healthcamp-07.jpeg", title: "Patients Receiving Care",            category: "Healthcare" },
  { url: "/images/healthcamp-08.jpeg", title: "Beacon Wings Health Camp Setup",     category: "Healthcare" },
  { url: "/images/healthcamp-09.jpeg", title: "Medicine Distribution",              category: "Healthcare" },
  { url: "/images/healthcamp-10.jpeg", title: "On-the-Spot Health Screening",       category: "Healthcare" },
  { url: "/images/healthcamp-11.jpeg", title: "Volunteers Assisting Patients",      category: "Healthcare" },
  { url: "/images/healthcamp-12.jpeg", title: "Health Camp in Progress",            category: "Healthcare" },
  { url: "/images/healthcamp-13.jpeg", title: "Community Members at the Camp",      category: "Healthcare" },
  { url: "/images/healthcamp-15.jpeg", title: "Health Check-up for Elders",         category: "Healthcare" },
  { url: "/images/healthcamp-16.jpeg", title: "Consultation for an Elderly Patient", category: "Healthcare" },
  { url: "/images/healthcamp-17.jpeg", title: "Families Waiting for Check-up",      category: "Healthcare" },
  { url: "/images/healthcamp-19.jpeg", title: "Street Health Camp — Lucknow",       category: "Healthcare" },
  { url: "/images/healthcamp-20.jpeg", title: "Medicine Handover",                  category: "Healthcare" },
];

function GalleryPage() {
  useDocumentMeta("Gallery", "Photos from our community and volunteer activities.");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Header */}
      <PageHeader
        eyebrow="Our Moments"
        title="Gallery"
        description="Snapshots from our field activities, community events, and volunteer drives."
      />

      <section className="py-14">
        <div className="container-max">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl2 shadow-soft transition hover:shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.url} alt={image.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition group-hover:opacity-100">
                  <div className="absolute bottom-0 p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">{image.category}</p>
                    <p className="mt-1 text-sm font-medium">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 z-10 rounded-full bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white shadow-lg transition hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X size={20} />
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} className="max-h-[85vh] rounded-xl2 shadow-2xl" />
            <div className="mt-4 text-center text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{selectedImage.category}</p>
              <p className="mt-1 text-lg font-medium">{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryPage;
