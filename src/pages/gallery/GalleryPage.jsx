import { useState } from "react";
import { X } from "lucide-react";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { PageHeader } from "../../components";

const galleryImages = [
  { url: "/images/activity-children-peace.jpeg",     title: "Community Play Session",      category: "Community"   },
  { url: "/images/activity-children-session.jpeg",   title: "Learning & Fun Session",      category: "Child Care"  },
  { url: "/images/activity-stationery.jpeg",         title: "Stationery Distribution",     category: "Child Care"  },
  { url: "/images/activity-gift-distribution.jpeg",  title: "Gift & Snack Distribution",   category: "Events"      },
  { url: "/images/activity-food-bowls.jpeg",         title: "Nutrition Drive",             category: "Child Care"  },
  { url: "/images/activity-food-field.jpeg",         title: "Food Distribution Drive",     category: "Child Care"  },
  { url: "/images/community-volunteers-group.jpeg",  title: "Volunteers with Community",   category: "Community"   },
  { url: "/images/volunteer-evening-kids.jpeg",      title: "Evening Activity Session",    category: "Events"      },
  { url: "/images/volunteer-group-selfie.jpeg",      title: "Team & Community Connect",    category: "Community"   },
  { url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop", title: "Women Empowerment",  category: "Women"       },
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
