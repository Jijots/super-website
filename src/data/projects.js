export const projects = [
  {
    slug: "2-valid-ids",
    title: "2 Valid IDs",
    year: "2026",
    tag: "Cinemalaya 2026 Official Entry",
    genre: "Social Drama",
    runtime: "92 mins",
    country: "Philippines",
    logline:
      "A poor farmer, unable to claim a remittance because she lacks the required two valid IDs, finds herself in a situation that challenges her character, beliefs, and morality.",
    cover: "/images/projects/2-valid-ids/03.jpg",
    stills: Array.from({ length: 8 }, (_, i) => `/images/projects/2-valid-ids/${String(i + 1).padStart(2, "0")}.jpg`),
    poster: "/images/projects/2-valid-ids/poster.jpg",
    director: "Ma-an L. Asuncion-Dagnalan",
    credits: [
      {
        label: "Production Companies",
        value:
          "Super! Entertainment, Eyepopper Multimedia Services, Cloudy Duck Pictures, Be True Entertainment and Recreation, Aliud Entertainment, CMB Film Services, Narra Post-production by Wildsound Studios Inc., Terminal Six Post, 901 Studios, Rizz Marketing",
      },
      { label: "Director", value: "Ma-an L. Asuncion-Dagnalan" },
      { label: "Cast", value: "Marietta Subong, Joey Marquez, Zaijan Jaranilla, Meryll Soriano" },
      { label: "Producer", value: "Geo Lomuntad, Ma-an L. Asuncion-Dagnalan" },
      {
        label: "Executive Producers",
        value:
          "Geo Lomuntad, Claudia Diaz Dojuangco, Ben Tsai, HJ Li, Pazio Fernandez, Michelle Fernandez, Jim Baltazar, Lydia Gapas",
      },
      { label: "Cinematography", value: "Neil Daza" },
      { label: "Production Designer", value: "Maolen Fadul" },
      { label: "Editing", value: "Vanessa Ubas-De Leon" },
      { label: "Sound Design", value: "Jannina Mikaela Minglanilla" },
      { label: "Music", value: "Mikey Amistoso, Jazz Nicolas" },
    ],
    awards: ["In Competition, Cinemalaya Independent Film Festival 2026"],
    handwritingNote:
      "a story about the clownery of the absurdity of red tape in the Philippines. chuchuchuchu like the production company's thoughts",
    pullQuote: {
      tagalog:
        "KAYA KA NGA KUKUHA NG ID DAHIL WALANG KANG ID, TAPOS HAHANAPAN KA NG ID? EH, KANINO BANG IDEA 'TO!?",
      english:
        "You're there to get an ID because you don't have one, then they ask you for an ID? Whose idea was this?",
    },
  },
  {
    slug: "patay-gutom",
    title: "Patay Gutom",
    year: "2026",
    tag: "CinePanalo 2026 Official Entry",
    genre: "Hybrid Live Action Animation, Queer, Comedy, Drama",
    runtime: "85 mins",
    country: "Philippines",
    logline:
      "After eating an offering meant for a grumpy ghost, a reclusive drifter finds himself tackling his odd jobs with an unlikely spirit companion, uncovering family secrets, fiery dangers, and a love that blurs the line between life and afterlife.",
    cover: "/images/projects/patay-gutom/01.jpg",
    stills: Array.from({ length: 7 }, (_, i) => `/images/projects/patay-gutom/${String(i + 1).padStart(2, "0")}.jpg`),
    director: "Carl Joseph E. Papa, Ian Pangilinan",
    credits: [
      { label: "Production Company", value: "Super! Entertainment" },
      { label: "Writer/Director", value: "Carl Joseph E. Papa" },
      { label: "Co-Director", value: "Ian Pangilinan" },
      { label: "Cast", value: "Ian Pangilinan, Khalil Ramos, Agot Isidro, Cris Villanueva" },
      { label: "Producer", value: "Geo Lomuntad" },
      { label: "Executive Producers", value: "Geo Lomuntad, Carlson Chan" },
      { label: "Cinematography", value: "Jethro Jamon" },
      { label: "Production Designer", value: "Eero Yves Francisco, PDCP" },
      { label: "Editing", value: "Benjamin Tolentino" },
      { label: "Sound Design and Music", value: "Paolo Almaden" },
    ],
    awards: ["In Competition, CinePanalo Film Festival 2026"],
  },
  {
    slug: "runo",
    title: "Runo!",
    year: "2026",
    tag: "Qcinema 2026 Official Entry",
    genre: "Animation, Adventure, Comedy",
    runtime: "20 mins",
    country: "Philippines",
    logline:
      "A few days after the apocalypse started in the Philippines, a silly Filipino stray rescue aspin dog is dead set on fetching her student owner through a long dangerous journey to defeat her worst enemy: an empty food bowl!",
    cover: "/images/projects/runo/01.jpg",
    stills: Array.from({ length: 7 }, (_, i) => `/images/projects/runo/${String(i + 1).padStart(2, "0")}.jpg`),
    director: "Jazmine Gin R. Pateña, Lysa Catolico",
    credits: [
      { label: "Production Companies", value: "Super! Entertainment, Runo Studios" },
      { label: "Writers/Directors", value: "Jazmine Gin R. Pateña, Lysa Catolico" },
      { label: "Cast", value: "Nour Hooshmand" },
      { label: "Producers", value: "Geo Lomuntad, Carl Joseph E. Papa" },
    ],
    awards: [
      "In Competition, Qcinema International Film Festival 2026",
      "Los Angeles Asian Pacific Film Festival 2026",
    ],
  },
];

export const marqueeImages = [
  "/images/projects/2-valid-ids/03.jpg",
  "/images/projects/patay-gutom/01.jpg",
  "/images/projects/runo/01.jpg",
  "/images/projects/2-valid-ids/07.jpg",
  "/images/projects/patay-gutom/04.jpg",
  "/images/projects/runo/07.jpg",
  "/images/projects/2-valid-ids/05.jpg",
  "/images/projects/patay-gutom/06.jpg",
];
