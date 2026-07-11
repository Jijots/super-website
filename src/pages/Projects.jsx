import { Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="font-display text-5xl text-super-red md:text-7xl">PROJECTS</h1>

      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="group block">
            <div className="relative aspect-video overflow-hidden rounded bg-ink/5">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-ink/0 p-4 transition-colors duration-300 group-hover:bg-ink/20">
                <span className="translate-y-2 font-display text-sm uppercase tracking-wide text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View project →
                </span>
              </div>
            </div>
            <h2 className="mt-3 font-display text-xl">{p.title}</h2>
            <p className="mt-1 text-sm uppercase tracking-wide text-ink/50">
              {p.tag} — {p.year}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
