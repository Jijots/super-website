export const projects = [
  {
    slug: "2-valid-ids",
    title: "2 Valid IDs",
    year: "2026",
    tag: "Cinemalaya 2026 Official Entry",
    logline: "A socio-political comedy-drama competing at the 2026 Cinemalaya Film Festival.",
    cover: "/images/projects/2-valid-ids/03.jpg",
    stills: Array.from({ length: 12 }, (_, i) => `/images/projects/2-valid-ids/${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "patay-gutom",
    title: "Patay Gutom",
    year: "2026",
    tag: "Short Film",
    logline: "A comedy short film.",
    cover: "/images/projects/patay-gutom/01.jpg",
    stills: Array.from({ length: 7 }, (_, i) => `/images/projects/patay-gutom/${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    slug: "runo",
    title: "Runo",
    year: "2026",
    tag: "Animated Short",
    logline: "An animated short film.",
    cover: "/images/projects/runo/01.jpg",
    stills: Array.from({ length: 7 }, (_, i) => `/images/projects/runo/${String(i + 1).padStart(2, "0")}.jpg`),
  },
];

export const marqueeImages = [
  "/images/projects/2-valid-ids/03.jpg",
  "/images/projects/patay-gutom/01.jpg",
  "/images/projects/runo/01.jpg",
  "/images/projects/2-valid-ids/07.jpg",
  "/images/projects/patay-gutom/04.jpg",
  "/images/projects/runo/07.jpg",
  "/images/projects/2-valid-ids/11.jpg",
  "/images/projects/patay-gutom/06.jpg",
];
