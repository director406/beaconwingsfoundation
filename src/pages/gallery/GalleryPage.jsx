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
  // 20 photos were provided; many were near-identical burst shots of
  // the same banner setup, so this is a curated selection of the most
  // distinct moments rather than every frame — avoids a repetitive-
  // looking gallery grid.
  { url: "/images/healthcamp-registration-1.jpeg",     title: "Health Camp Registration — Lucknow", category: "Healthcare"  },
  { url: "/images/healthcamp-pediatric-checkup.jpeg",  title: "Pediatric Check-up",                 category: "Healthcare"  },
  { url: "/images/healthcamp-consultation-1.jpeg",     title: "Doctors Distributing Medicines",     category: "Healthcare"  },
  { url: "/images/healthcamp-consultation-elderly.jpeg", title: "Health Check-up for Elders",       category: "Healthcare"  },
  { url: "/images/healthcamp-family-checkup.jpeg",     title: "Family Health Check-up",             category: "Healthcare"  },
  { url: "/images/healthcamp-bp-checkup.jpeg",         title: "Blood Pressure Screening",           category: "Healthcare"  },
  { url: "/images/healthcamp-banner-1.jpeg",           title: "Beacon Wings Health Camp",           category: "Healthcare"  },
  { url: "/images/healthcamp-setup-2.jpeg",            title: "Community Health Camp",              category: "Healthcare"  },
  { url: "/images/healthcamp-team-1.jpeg",             title: "Led by Director Prachi Nirmal & Team", category: "Healthcare"  },
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
