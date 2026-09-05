// Category order follows Geo's Super Website 2.0 projects artboard.
export const CATEGORIES = [
  { id: "films", label: ["SUPER", "FILMS"] },
  { id: "shorts", label: ["SUPER", "SHORTS"] },
  { id: "music-videos", label: ["SUPER", "MUSIC VIDEOS"] },
];

export const projects = [
  {
    slug: "2-valid-ids",
    category: "films",
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
    awards: [
      "Special Jury Award, Cinemalaya Independent Film Festival 2026",
      "Best Actress for Marietta Subong, Cinemalaya Independent Film Festival 2026",
      "Audience Choice Award, Cinemalaya Independent Film Festival 2026",
      "Hawaii International Film Festival 2026",
      "Mar Del Plata International Film Festival 2026",
    ],
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
    category: "films",
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
      {
        label: "Production Companies",
        value: "Super! Entertainment, 901 Studios, Rizz Marketing",
      },
      { label: "Director", value: "Carl Joseph E. Papa, Ian Pangilinan" },
      { label: "Cast", value: "Khalil Ramos, Ian Pangilinan, Agot Isidro, Cris Villanueva" },
      { label: "Producer", value: "Geo Lomuntad, Ma. Sarah Perez" },
      { label: "Executive Producers", value: "Geo Lomuntad, Carl Joseph E. Papa" },
      { label: "Cinematography", value: "Jethro Jamon" },
      { label: "Production Designer", value: "Eero Yves S. Francisco, PDCP" },
      { label: "Editing", value: "Ben Tolentino" },
      { label: "Sound Design", value: "Paolo Almaden" },
      { label: "Music", value: "Paolo Almaden" },
    ],
    awards: ["In Competition, CinePanalo Film Festival 2026"],
  },
  {
    slug: "runo",
    category: "shorts",
    title: "Runo!",
    year: "2025",
    tag: "QCinema 2025 Official Entry",
    genre: "Animation, Adventure, Comedy",
    runtime: "20 mins",
    country: "Philippines",
    logline:
      "A few days after the apocalypse started in the Philippines, a silly Filipino stray rescue aspin dog is dead set on fetching her student owner through a long dangerous journey to defeat her worst enemy: an empty food bowl!",
    cover: "/images/projects/runo/01.jpg",
    stills: Array.from({ length: 7 }, (_, i) => `/images/projects/runo/${String(i + 1).padStart(2, "0")}.jpg`),
    director: "Jazmine Gin R. Pateña, Lysa Catolico",
    trailer: "https://www.facebook.com/reel/852358200566749",
    credits: [
      {
        label: "Production Companies",
        value: "Super! Entertainment, Runo Studios, QCinema",
      },
      { label: "Written and Directed by", value: "Lysa Catolico, Jazmine Gin R. Pateña" },
      { label: "Starring", value: "Nour Hooshmand" },
      { label: "Sound Designer and Musical Scorer", value: "Nicholai Minion" },
      { label: "Editors", value: "Lysa Catolico, Jazmine Gin R. Pateña" },
      { label: "Animation Supervisor", value: "Kyle Riley Sagum" },
      { label: "Backgrounds Supervisor", value: "Michael Moncayo" },
      { label: "Associate Producer", value: "Rory Esguerra" },
      { label: "Line Producer", value: "Rebekah Sarabosing" },
      {
        label: "Producers",
        value: "Carl Joseph E. Papa, Geo Lomuntad, Rebekah Sarabosing",
      },
      {
        label: "Executive Producers",
        value:
          "Ed Lejano, Manet A. Dayrit, Liza Diño, Carl Joseph E. Papa, Geo Lomuntad",
      },
    ],
    awards: [
      "QCShorts Grantee and Official Selection, QCinema 2025",
      "Official Selection, Los Angeles Asia Pacific Film Festival 2026",
      "Short Film Finalist and Best Screenplay, Cinemalaya 2026",
      "Best Short Film Nominee, 49th Gawad Urian 2026",
      "Official Selection, Sydney Sci-Fi Film Festival 2026",
    ],
  },
  {
    slug: "surface-tension",
    category: "shorts",
    title: "Surface Tension",
    year: "2025",
    tag: "QCinema 2025",
    country: "Philippines",
    director: "Serrano Sisters",
    cover: null,
    stills: [],
    awards: ["Best Short Film, QCinema International Film Festival 2025"],
    // Awaiting stills, logline and full credits from Geo.
    pending: true,
  },
  {
    slug: "ours-was-a-timeless-night-burning",
    category: "shorts",
    title: "Ours Was A Timeless Night Burning",
    year: "2025",
    tag: "Short Film",
    country: "Philippines",
    director: "Lauviah Caliboso",
    cover: null,
    stills: [],
    credits: [
      {
        label: "Production Companies",
        value:
          "CMB Film Services, Inc., UXS Film Inc., 901 Studios, Super! Entertainment",
      },
      { label: "Director", value: "Lauviah Caliboso" },
      {
        label: "Cast",
        value:
          "Khryzha Sonelle “Summer” Bien, Euni Beatriz, Jorrybell Agoto, Bong Cabrera, Bart Guingona",
      },
      { label: "Producers", value: "Jamie Pauline Sanchez, Kim Sta. Ana" },
      {
        label: "Co-Producers",
        value: "Quezon City Film Commission, Jon Galvez, Geo Lomuntad",
      },
      {
        label: "Executive Producers",
        value:
          "Eduardo Lejano Jr., Liza Diño-Seguerra, Manet Dayrit, Marissa Caliboso, Patricia Sumagui, Madonna Tarrayo",
      },
      { label: "Cinematography", value: "Kara Moreno, LPS" },
      { label: "Production Designer", value: "Kukay Bautista Zinampan" },
      { label: "Editing", value: "Ryan Capili" },
      { label: "Sound Design", value: "Wapak Sound Studios" },
      { label: "Music", value: "Miguel Lorenzo Peralta" },
    ],
    awards: [
      "Lokal Shorts, QCinema International Film Festival 2025",
      "Finalist, VIPA International Film Festival 2026",
    ],
    // Awaiting stills and logline from Geo.
    pending: true,
  },
  {
    slug: "citys-laundry-and-taxes",
    category: "shorts",
    title: "City's Laundry and Taxes",
    tag: "Short Film",
    country: "Philippines",
    director: "Diana Galang",
    cover: null,
    stills: [],
    credits: [
      {
        label: "Production Companies",
        value:
          "V Films, Mi Casa Pelikula, Arrowhead, Terminal Six Post, WAF Studios, Super! Entertainment, Film Development Council of the Philippines",
      },
      { label: "Director", value: "Diana Galang" },
      {
        label: "Cast",
        value: "Louise Abuel, Arabelle Arcega, Mylene Dizon, Clifford Gonzales",
      },
      { label: "Producer", value: "Earvic Noay, Angel Hildawa" },
      { label: "Co-Producer", value: "Geo Lomuntad" },
      {
        label: "Executive Producers",
        value:
          "Eduardo Lejano Jr., Liza Diño-Seguerra, Manet Dayrit, Angelito Galang, Elvira Galang, Diana Galang, Adam Dumaguin",
      },
      { label: "Cinematography", value: "Adam Dumaguin" },
      { label: "Production Designer", value: "Baj San Jose" },
      { label: "Editing", value: "Miguel Ramos" },
      { label: "Sound Design", value: "Pepe Manikan, Paulo Dela Cruz" },
      { label: "Music", value: "Glenn Barit" },
    ],
    awards: [
      "Best Short Film Nominee, 49th Gawad Urian (Philippines)",
      "Best Narrative Film, 38th CCP Gawad Alternatibo (Philippines)",
      "Best Asian Cinema, Short. Sweet. Film Festival (USA)",
      "Shortlisted, ShortShorts Film Festival & Asia (Japan)",
      "People's Choice Award, 17th Pandayang Lino Brocka (Philippines)",
      "Special Exhibition, Minikino Film Week S-Express Exhibition (Indonesia)",
      "Official Selection, 8th SineKabataan Film Festival (Philippines)",
      "Official Selection, PeliKultura: CALABARZON Film Festival (Philippines)",
      "Official Selection, 13th Nabunturan Independent Film Exhibition (Philippines)",
    ],
    // Awaiting stills, year and logline from Geo.
    pending: true,
  },
  {
    slug: "malayo-mv",
    category: "music-videos",
    title: "Malayo",
    tag: "Music Video",
    country: "Philippines",
    cover: null,
    stills: [],
    // Awaiting director, stills and credits from Geo.
    pending: true,
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
