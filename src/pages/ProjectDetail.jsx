import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

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

  return (
    <section className="px-6 py-16 md:px-10">
      <Link to="/projects" className="text-sm uppercase tracking-wide text-ink/50">
        ← Back to Projects
      </Link>
      <h1 className="mt-4 font-display text-5xl text-super-red md:text-7xl">
        {project.title}
      </h1>
      <p className="mt-2 text-sm uppercase tracking-wide text-ink/50">
        {project.tag} — {project.year}
      </p>
      <p className="mt-6 max-w-2xl text-super-red">{project.logline}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {project.stills.map((src, i) => (
          <div
            key={src}
            className={`overflow-hidden rounded bg-ink/5 ${i === 0 ? "sm:col-span-2 aspect-video" : "aspect-[4/3]"}`}
          >
            <img
              src={src}
              alt={`${project.title} still ${i + 1}`}
              className="h-full w-full object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
