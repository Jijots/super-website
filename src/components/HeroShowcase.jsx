import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FILM_MS = 5600;

export default function HeroShowcase({ films }) {
  const [film, setFilm] = useState(0);

  // Cross-fade the films underneath the floating lockup.
  useEffect(() => {
    if (films.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFilm((f) => (f + 1) % films.length), FILM_MS);
    return () => clearInterval(id);
  }, [films.length]);

  const current = films[film];

  return (
    <div className="relative h-[78vh] min-h-[30rem] w-full overflow-hidden bg-ink">
      {films.map((f, i) => (
        <img
          key={f.slug}
          src={f.cover}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === film ? 1 : 0 }}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Keeps the title and the lockup legible whatever the still is doing. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />

      {/* The film, named plainly. Geo asked for normal Space Grotesk here, not
          the display face, so the lettering above stays the loud thing. */}
      {current && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-[8%]">
          <Link
            to={`/projects/${current.slug}`}
            className="group block text-center"
          >
            <span className="block text-xl font-medium text-paper transition-colors group-hover:text-super-red md:text-2xl">
              {current.title}
              {current.year ? ` (${current.year})` : ""}
            </span>
            {current.director && (
              <span className="mt-1.5 block text-xs uppercase tracking-[0.18em] text-paper/70">
                dir. {current.director}
              </span>
            )}
          </Link>
        </div>
      )}

    </div>
  );
}
