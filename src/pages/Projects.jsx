import { Link } from "react-router-dom";
import { CATEGORIES, projects } from "../data/projects";

// Geo's 2.0 artboard: a red rule grid, category label in the left gutter, and
// the still and its title alternating sides row to row.
function Row({ project, index }) {
  const imageFirst = index % 2 === 0;

  const still = project.cover ? (
    <img
      src={project.cover}
      alt={project.title}
      className="h-full w-full rounded-xl object-cover ring-2 ring-super-red"
      loading="lazy"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-xl px-4 text-center text-xs uppercase tracking-wide text-super-red/50 ring-2 ring-super-red/30">
      Stills coming soon
    </div>
  );

  const caption = (
    <div className={imageFirst ? "md:text-left" : "md:text-right"}>
      <h3 className="font-display text-xl leading-tight text-super-red md:text-2xl">
        {project.title}
        {project.year ? ` (${project.year})` : ""}
      </h3>
      {project.director && (
        <p className="mt-1 text-xs text-super-red/70 md:text-sm">dir. {project.director}</p>
      )}
    </div>
  );

  return (
    <div className="grid items-center gap-4 border-b-2 border-super-red py-6 md:grid-cols-2 md:gap-8">
      <div className={`aspect-video ${imageFirst ? "md:order-1" : "md:order-2"}`}>{still}</div>
      <div className={imageFirst ? "md:order-2" : "md:order-1"}>{caption}</div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="font-display text-5xl text-super-red md:text-7xl">PROJECTS</h1>

      {CATEGORIES.map((cat) => {
        const items = projects.filter((p) => p.category === cat.id);
        if (!items.length) return null;

        return (
          <div key={cat.id} className="mt-12 md:grid md:grid-cols-[9rem_1fr] md:gap-8">
            <h2 className="font-display text-2xl leading-[0.95] text-super-red md:sticky md:top-24 md:self-start md:text-3xl">
              {cat.label[0]}
              <br />
              <span className="text-xl md:text-2xl">{cat.label[1]}</span>
            </h2>

            <div className="mt-4 border-t-2 border-super-red md:mt-0">
              {items.map((p, i) =>
                p.pending ? (
                  <Row key={p.slug} project={p} index={i} />
                ) : (
                  <Link key={p.slug} to={`/projects/${p.slug}`} className="group block">
                    <Row project={p} index={i} />
                  </Link>
                ),
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
