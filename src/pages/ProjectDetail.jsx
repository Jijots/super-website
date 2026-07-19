import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

function Credit({ label, value }) {
  if (!value) return null;
  return (
    <p className="text-sm">
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="px-6 py-16 md:px-10">
        <p>Project not found.</p>
        <Link to="/projects" className="underline">
          Back to Projects
        </Link>
      </section>
    );
  }

  const hasCredits = Boolean(project.credits?.length);

  return (
    <section className="px-6 py-16 md:px-10">
      <Link to="/projects" className="text-sm uppercase tracking-wide text-ink/50">
        ← Back to Projects
      </Link>

      <div className="mt-8 aspect-video overflow-hidden rounded bg-ink/5">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 border-b border-ink/10 pb-8 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-5xl text-super-red md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-wide text-ink/50">
            {[project.director, project.genre].filter(Boolean).join(" — ")}
          </p>
        </div>
        <p className="text-sm uppercase tracking-wide text-ink/50 md:text-right">
          {[project.runtime, project.year, project.country].filter(Boolean).join(" / ")}
        </p>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-lg text-super-red md:text-xl">{project.logline}</p>

          {hasCredits && (
            <div className="mt-10 border-b border-ink/10 pb-10">
              <h2 className="text-sm uppercase tracking-wide text-ink/40">Team</h2>
              <div className="mt-2 space-y-1">
                {project.credits.map((c) => (
                  <Credit key={c.label} label={c.label} value={c.value} />
                ))}
              </div>
            </div>
          )}

          {project.awards && (
            <div className="mt-10">
              <h2 className="text-sm uppercase tracking-wide text-ink/40">Awards</h2>
              <ul className="mt-2 space-y-1">
                {project.awards.map((award) => (
                  <li key={award} className="text-super-red">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="flex aspect-video items-center justify-center rounded bg-ink text-sm uppercase tracking-wide text-cream/40">
            Trailer coming soon
          </div>

          {project.poster && (
            <div className="mt-4 aspect-video overflow-hidden rounded">
              <img
                src={project.poster}
                alt={`${project.title} poster`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}
        </div>
      </div>

      {project.handwritingNote && (
        <p className="mt-10 -rotate-1 text-center font-serif text-lg italic text-ink/70">
          {project.handwritingNote}
        </p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {project.stills.slice(1).map((src, i) => (
          <div key={src} className="aspect-[4/3] overflow-hidden rounded bg-ink/5">
            <img
              src={src}
              alt={`${project.title} still ${i + 2}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {project.pullQuote && (
        <div className="mt-16 border-t border-ink/10 pt-10">
          <p className="font-display text-3xl leading-tight text-super-red md:text-5xl">
            {project.pullQuote.tagalog}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-ink/50">{project.pullQuote.english}</p>
        </div>
      )}
    </section>
  );
}
