import { useEffect, useRef, useState } from "react";
import { collaborators, companyIntro, team } from "../data/team";

// A grid tile: the person's photos cross-fade here, and clicking opens the card.
function TeamTile({ member, onOpen }) {
  const [photo, setPhoto] = useState(0);
  const photos = member.photos ?? [];

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setPhoto((p) => (p + 1) % photos.length), 3200);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-[26rem] w-full overflow-hidden text-left ring-2 ring-super-red"
    >
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
        <p className="text-2xl font-bold text-cream">{member.name}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
        <span className="mt-4 inline-block bg-super-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-cream transition-transform group-hover:-translate-y-0.5">
          Tap to read bio →
        </span>
      </div>
    </button>
  );
}

// Geo's playing-card idea: the card comes up on screen and pivots on its
// corner, and at the edge-on point the face changes from the photo to the bio.
function TeamCardModal({ member, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const closeRef = useRef(null);

  // Spin to the bio shortly after it appears, then it is tap to turn over.
  useEffect(() => {
    const id = setTimeout(() => setFlipped(true), 260);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name}, ${member.role}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-super-red text-xl text-cream"
      >
        ✕
      </button>

      <div
        className="[perspective:1600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-expanded={flipped}
          aria-label={`${flipped ? "Show photo of" : "Read bio for"} ${member.name}`}
          className={`relative block h-[30rem] w-[80vw] max-w-sm origin-bottom-left text-left [transform-style:preserve-3d] ${
            flipped ? "animate-card-spin" : "animate-card-spin-back"
          }`}
        >
          {/* front: the photo */}
          <div className="absolute inset-0 overflow-hidden bg-ink ring-2 ring-super-red [backface-visibility:hidden]">
            {member.photos?.[0] && (
              <img
                src={member.photos[0]}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-20">
              <p className="text-2xl font-bold text-cream">{member.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
            </div>
          </div>

          {/* back: the bio */}
          <div className="absolute inset-0 overflow-y-auto bg-super-red p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-xl font-bold text-cream">{member.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-cream/90">
              {member.bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
            <span className="mt-6 inline-block text-xs font-bold uppercase tracking-wide text-cream/70">
              Tap the card to turn it over
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function Company() {
  const [openMember, setOpenMember] = useState(null);

  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-super-red md:text-6xl">
        {companyIntro}
      </h1>

      <h2 className="mt-20 text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">
        Our Team
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <TeamTile key={m.slug} member={m} onOpen={() => setOpenMember(m)} />
        ))}
        <div className="flex h-[26rem] items-center justify-center text-center text-sm uppercase tracking-wide text-super-red/40 ring-2 ring-dashed ring-super-red/30">
          Second team member
          <br />
          coming soon
        </div>
      </div>

      <h2 className="mt-20 text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">
        Collaborators
      </h2>
      {collaborators.length > 0 ? (
        <ul className="mt-6 divide-y divide-super-red/30 border-y border-super-red/30">
          {collaborators.map((c) => (
            <li key={c.name} className="py-4 text-lg">
              {c.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm uppercase tracking-wide text-ink/40">
          Collaborator list coming soon
        </p>
      )}

      {openMember && (
        <TeamCardModal member={openMember} onClose={() => setOpenMember(null)} />
      )}
    </section>
  );
}
