// Bio copy is verbatim from the director profile Geo supplied (Sept 2026).
export const team = [
  {
    slug: "geo-lomuntad",
    name: "Geo Lomuntad",
    role: "Director / Producer",
    photos: [
      "/images/company/geo-01.jpg",
      "/images/company/geo-03.jpg",
      "/images/company/geo-04.jpg",
    ],
    bio: [
      "Geo Lomuntad is a director and producer based in Manila, Philippines. He began his film career as a script supervisor before working closely with acclaimed producer Bianca Balbuena as associate producer on Fan Girl, which premiered at Tallinn Black Nights Film Festival in 2020.",
      "Since then, he has produced Iti Mapukpukaw (The Missing), winner of Best Film, Best Supporting Actress, and the NETPAC Jury Award at the 2023 Cinemalaya Independent Film Festival, and the Philippines' submission to the 2024 Academy Awards, and Sunshine, which won the Crystal Bear for Best Film at Berlinale 2025.",
      "He is an alumnus of Talents Tokyo, the Busan Asian Film School, Full Circle Lab, and Berlinale Talents. In 2022 he made his directing debut with the TV series Suntok sa Buwan, which earned Aga Muhlach his first Best Actor nomination at the Asian TV Awards. He is currently developing his second short film Fallen Angel and his debut feature Born Late.",
    ],
  },
  {
    slug: "carl-joseph-papa",
    name: "Carl Joseph E. Papa",
    role: "Director / Creative Supervisor",
    photos: [
      "/images/company/carl-01.jpg",
      "/images/company/carl-02.jpg",
      "/images/company/carl-03.jpg",
    ],
    bio: [
      "Carl Joseph E. Papa is a software engineer by profession but being a storyteller has always been his passion.",
      "His short animated films and feature length animated film have been recognized in the Philippines and abroad: Annecy International Animation Festival, Palm Springs International Film Festival, International Film Festival Rotterdam, Animator Film Festival, NETPAC, BIFAN and the Asia Pacific Screen Awards, to name a few.",
      "His most recent film, “The Missing”, made history as the first animated film to represent the Philippines for the Best International Feature category at the Academy Awards.",
    ],
  },
];

// Collaborators use the same card as the team, so tapping one turns it over to
// the bio. Bios are verbatim from the documents Geo supplied. Lysa's bio uses
// they/them, which is kept exactly as written.
export const collaborators = [
  {
    slug: "lysa-catolico",
    name: "Lysa Catolico",
    role: "Writer / Director, Runo!",
    photos: ["/images/company/lysa-01.jpg"],
    bio: [
      "Lysa Catolico is BS Animation student based from Quezon City, Philippines pursuing a career in animation production and art direction. They have volunteered as an animator in multiple student films, and had their first directed short film (along with Jazmine Gin R. Pateña) “RUNO!” officially screened in the QCinema QCShorts Program 2025, Los Angeles Asia Pacific Film Festival, and Cinemalaya 2026, which won best Screenplay for Short Film Category.",
      "Their goal is to create and produce local animated stories relating to their personal struggles and passions in the hopes that other fellow Filipinos can find inspiration in them. Currently, they are working as an associate producer under another Clister Santos’ “Sana’y Nandito Ka”, one of the grantees for QCShorts Program 2026.",
    ],
  },
  {
    slug: "maan-asuncion-dagnalan",
    name: "Ma-an L. Asuncion-Dagñalan",
    role: "Director / Writer",
    // Awaiting a photo from Geo; the card shows a placeholder until then.
    photos: [],
    bio: [
      "Ma-an L. Asuncion-Dagñalan is an award-winning filmmaker recognized for her acclaimed feature Blue Room, which won Best Foreign Film at the 2023 LA Femme International Film Festival. She took home Best Director honors at both the 2022 Cinemalaya Film Festival and the 2023 FAMAS Awards.",
      "Trained under National Artist for Film Ricky Lee, Ma-an currently serves as the Board Secretary of the Directors Guild of the Philippines (DGPI) and is a core member of the Filipino Screenwriters Guild (FSG).",
    ],
  },
  {
    slug: "jazmine-gin-patena",
    name: "Jazmine Gin R. Pateña",
    role: "Writer / Director, Runo!",
    // Awaiting a photo from Geo; the card shows a placeholder until then.
    photos: [],
    bio: [
      "Jazmine Gin R. Pateña hails from a small village in Laguna, where she knew her dreams for storytelling run deep and big. She is currently majoring BS in Animation and a mentee of VISION Creative Unit in iACADEMY, where her love for animation and films prospered.",
      "From being a semi-finalist in SIKAP’s SAPLING Pitch Lab to winning a grant of QCShorts 2025 along with her director, Lysa Catolico, where they made their first-ever short film, “RUNO!”. They also won Best Screenplay from Cinemalaya 22: Reel Reflections and have been nominated for the 49th Gawad Urian as Best Short Film.",
      "Jazmine’s currently residing in Makati with her family and her cat, honing her craft for storytelling.",
    ],
  },
];

export const companyIntro = "Super! is a Filipino production company.";

// On-set and behind-the-scenes photos for the top of the Company page.
export const btsPhotos = Array.from(
  { length: 7 },
  (_, i) => `/images/company/bts-${String(i + 1).padStart(2, "0")}.jpg`,
);
