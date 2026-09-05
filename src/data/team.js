// Bio copy is verbatim from the director profile Geo supplied (Sept 2026).
export const team = [
  {
    slug: "geo-lomuntad",
    name: "Geo Lomuntad",
    role: "Director / Producer",
    photos: [
      "/images/company/geo-01.jpg",
      "/images/company/geo-03.jpg",
      "/images/company/geo-02.jpg",
      "/images/company/geo-04.jpg",
      "/images/company/geo-06.jpg",
      "/images/company/geo-05.jpg",
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

// Geo is sending the second team member plus the collaborator list and bios.
export const collaborators = [];

export const companyIntro = "Super! is a Filipino production company.";

// On-set and behind-the-scenes photos for the top of the Company page.
export const btsPhotos = Array.from(
  { length: 7 },
  (_, i) => `/images/company/bts-${String(i + 1).padStart(2, "0")}.jpg`,
);
