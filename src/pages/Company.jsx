import { useEffect, useState } from "react";
import { btsPhotos, collaborators, companyIntro, team } from "../data/team";

const PHOTO_MS = 3200;

// The card stays put in the grid: photos cross-fade on the front, and clicking
// turns it over in place to show the bio. Geo did not want this taking over
// the whole screen.
function TeamCard({ member }) {
  const photos = member.photos ?? [];
  const [flipped, setFlipped] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Hold the photo while the bio is being read.
    if (flipped || paused || photos.length < 2) return;
    const id = setInterval(() => setPhoto((p) => (p + 1) % photos.length), PHOTO_MS);
    return () => clearInterval(id);
  }, [flipped, paused, photos.length]);

  return (
    <div className="[perspective:1600px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-expanded={flipped}
        aria-label={`${flipped ? "Hide" : "Read"} bio for ${member.name}`}
        className="group relative block h-[30rem] w-full text-left transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* front: the photos */}
        <div className="absolute inset-0 overflow-hidden bg-ink ring-2 ring-super-red [backface-visibility:hidden]">
          {photos.length ? (
            photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? member.name : ""}
                aria-hidden={i !== 0}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === photo ? 1 : 0 }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-wide text-super-red/50">
              Photo coming soon
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-20">
            <p className="text-2xl font-bold text-paper">{member.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-paper/70">{member.role}</p>
            <span className="mt-4 inline-block bg-super-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-paper transition-transform group-hover:-translate-y-0.5">
              Tap to read bio →
            </span>
          </div>
        </div>

        {/* back: the bio */}
        <div className="absolute inset-0 overflow-y-auto bg-super-red p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xl font-bold text-paper">{member.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-paper/70">{member.role}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-paper/90">
            {member.bio.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <span className="mt-6 inline-block text-xs font-bold uppercase tracking-wide text-paper/70">
            ← Tap to go back
          </span>
        </div>
      </button>
    </div>
  );
}

export default function Company() {
  return (
    <section className="py-16">
      {/* On-set photos open the page, flush edge to edge. */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {btsPhotos.map((src, i) => (
          <div
            key={src}
            className={`aspect-[4/3] overflow-hidden ${i === 0 ? "col-span-2 row-span-2 md:aspect-auto" : ""}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading={i < 4 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>

      <h1 className="mt-16 max-w-4xl px-6 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-super-red md:px-10 md:text-6xl">
        {companyIntro}
      </h1>

      <h2 className="mt-20 px-6 text-3xl font-bold uppercase tracking-tight text-super-red md:px-10 md:text-5xl">
        Our Team
      </h2>
      <div className="mt-8 grid gap-6 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {team.map((m) => (
          <TeamCard key={m.slug} member={m} />
        ))}
      </div>

      <h2 className="mt-20 px-6 text-3xl font-bold uppercase tracking-tight text-super-red md:px-10 md:text-5xl">
        Collaborators
      </h2>
      {collaborators.length > 0 ? (
        <ul className="mt-6 mx-6 divide-y divide-super-red/30 border-y border-super-red/30 md:mx-10">
          {collaborators.map((c) => (
            <li key={c.name} className="py-4 text-lg">
              {c.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 px-6 text-sm uppercase tracking-wide text-ink/40 md:px-10">
          Collaborator list coming soon
        </p>
      )}
    </section>
  );
}
