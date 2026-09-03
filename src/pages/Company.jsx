import { useState } from "react";
import { btsPhotos, collaborators, companyIntro, team } from "../data/team";
import { useInView } from "../hooks/useInView";

// Geo asked for the bio to sit on the back of a card that turns over, the way a
// playing card flips from one face to another.
function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="[perspective:1400px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-label={`${flipped ? "Hide" : "Show"} bio for ${member.name}`}
        className="relative block h-[30rem] w-full text-left transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* front */}
        <div className="absolute inset-0 overflow-hidden ring-2 ring-super-red [backface-visibility:hidden]">
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-wide text-super-red/50">
              Photo coming soon
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16">
            <p className="text-2xl font-bold text-cream">{member.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
          </div>
        </div>

        {/* back */}
        <div className="absolute inset-0 overflow-y-auto bg-super-red p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xl font-bold text-cream">{member.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-cream/70">{member.role}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-cream/90">
            {member.bio.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Company() {
  const [btsRef, btsInView] = useInView();

  return (
    <section className="px-6 py-16 md:px-10">
      {/* Scattered festival / behind-the-scenes photos, per the 2.0 direction */}
      <div ref={btsRef} className="grid grid-cols-2 md:grid-cols-5">
        {btsPhotos.map((src, i) => (
          <div
            key={src}
            className={`overflow-hidden transition-all duration-700 ${
              i === 4 ? "col-span-2 md:col-span-1" : ""
            }`}
            style={{
              opacity: btsInView ? 1 : 0,
              transform: btsInView ? "translateY(0)" : "translateY(24px)",
              transitionDelay: `${i * 90}ms`,
            }}
          >
            <img src={src} alt="" className="h-48 w-full object-cover md:h-56" loading="lazy" />
          </div>
        ))}
      </div>

      <h1 className="mt-16 max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-tight text-super-red md:text-6xl">
        {companyIntro}
      </h1>

      <h2 className="mt-20 text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">Our Team</h2>
      <p className="mt-2 text-sm uppercase tracking-wide text-ink/40">Tap a card to read the bio</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <TeamCard key={m.slug} member={m} />
        ))}
        <div className="flex h-[30rem] items-center justify-center text-center text-sm uppercase tracking-wide text-super-red/40 ring-2 ring-dashed ring-super-red/30">
          Second team member
          <br />
          coming soon
        </div>
      </div>

      <h2 className="mt-20 text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">Collaborators</h2>
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
    </section>
  );
}
