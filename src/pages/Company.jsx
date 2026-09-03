import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { collaborators, companyIntro, team } from "../data/team";

const SPIN_MS = 6000; // one full turn
const HALF = SPIN_MS / 2; // a new picture every half turn

// The card keeps turning and the picture has changed each time it comes back
// round, the way Geo described an ace becoming a two. Hovering stops it so you
// can look, and clicking opens the bio.
function TeamCard({ member, onOpen }) {
  const photos = member.photos ?? [];
  const [faces, setFaces] = useState([0, 1 % Math.max(photos.length, 1)]);
  const [paused, setPaused] = useState(false);
  const counter = useRef(1);

  useEffect(() => {
    if (paused || photos.length < 2) return;
    // Swap the hidden face while the card is edge-on, a quarter turn in.
    let interval;
    const start = setTimeout(() => {
      const step = () => {
        counter.current += 1;
        const next = counter.current % photos.length;
        setFaces((prev) =>
          counter.current % 2 === 0 ? [next, prev[1]] : [prev[0], next],
        );
      };
      step();
      interval = setInterval(step, HALF);
    }, HALF / 2);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [paused, photos.length]);

  const Face = ({ src, back }) => (
    <div
      className={`absolute inset-0 overflow-hidden bg-ink ring-2 ring-super-red [backface-visibility:hidden] ${
        back ? "[transform:rotateY(180deg)]" : ""
      }`}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-wide text-super-red/50">
          Photo coming soon
        </div>
      )}
    </div>
  );

  return (
    <div className="[perspective:1600px]">
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`Read bio for ${member.name}`}
        className="group relative block h-[26rem] w-full text-left [transform-style:preserve-3d] animate-card-turn"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        <Face src={photos[faces[0]]} />
        <Face src={photos[faces[1]]} back />
      </button>

      {/* Held outside the turning card so the name stays readable */}
      <div className="mt-4">
        <p className="text-2xl font-bold text-super-red">{member.name}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{member.role}</p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-3 inline-block bg-super-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-cream"
        >
          Tap to read bio →
        </button>
      </div>
    </div>
  );
}

// The bio comes up over the page and turns over once to reveal itself.
function BioCard({ member, onClose }) {
  const closeRef = useRef(null);

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

  // Portalled to <body>: the page transition leaves a transform on an ancestor,
  // which would otherwise make this fixed overlay size against that element
  // instead of the viewport.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name}, ${member.role}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center bg-super-red text-xl text-cream"
      >
        ✕
      </button>

      <div className="[perspective:1600px]" onClick={(e) => e.stopPropagation()}>
        {/* Turns over once as it appears, so the photo gives way to the bio. */}
        <div
          className="relative h-[70vh] max-h-[34rem] w-[80vw] max-w-sm animate-card-reveal [transform-style:preserve-3d]"
          style={{ animationDelay: "200ms" }}
        >
          <div className="absolute inset-0 overflow-hidden bg-ink ring-2 ring-super-red [backface-visibility:hidden]">
            {member.photos?.[0] && (
              <img src={member.photos[0]} alt={member.name} className="h-full w-full object-cover" />
            )}
          </div>

          <div className="absolute inset-0 overflow-y-auto bg-super-red p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-xl font-bold text-cream">{member.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-cream/90">
              {member.bio.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
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
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <TeamCard key={m.slug} member={m} onOpen={() => setOpenMember(m)} />
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

      {openMember && <BioCard member={openMember} onClose={() => setOpenMember(null)} />}
    </section>
  );
}
