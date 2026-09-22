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
      className="h-full w-full object-cover"
      loading="lazy"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs uppercase tracking-wide text-super-red/50">
      Stills coming soon
    </div>
  );

  const caption = (
    <div className={`px-0 py-5 md:px-8 ${imageFirst ? "md:text-left" : "md:text-right"}`}>
      <h3 className="text-xl font-bold leading-tight text-super-red md:text-2xl">
        {project.title}
        {project.year ? ` (${project.year})` : ""}
      </h3>
      {project.director && (
        <p className="mt-1 text-xs text-super-red/70 md:text-sm">dir. {project.director}</p>
      )}
    </div>
  );

  return (
    <div className="grid items-center border-b-2 border-super-red md:grid-cols-2">
      <div className={`aspect-video border-super-red md:border-r-2 ${imageFirst ? "md:order-1" : "md:order-2 md:border-l-2 md:border-r-0"}`}>{still}</div>
      <div className={imageFirst ? "md:order-2" : "md:order-1"}>{caption}</div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="sr-only">Projects</h1>

      {CATEGORIES.map((cat, catIndex) => {
        const items = projects.filter((p) => p.category === cat.id);
        if (!items.length) return null;

        return (
          <div
            key={cat.id}
            className={`md:grid md:grid-cols-[9rem_1fr] md:gap-8 ${catIndex === 0 ? "" : "mt-12"}`}
          >
            {/* Geo's own lettering, painted through its alpha as a mask so it
                takes the theme colour instead of being a flat red picture. */}
            <h2
              aria-label={cat.label.join(" ")}
              className="text-super-red md:sticky md:top-24 md:self-start"
            >
              {cat.mask ? (
                <span
                  aria-hidden="true"
                  className="block w-32 max-w-full md:w-[80%]"
                  style={{
                    aspectRatio: String(cat.ratio),
                    backgroundColor: "currentColor",
                    WebkitMaskImage: `url(${cat.mask})`,
                    maskImage: `url(${cat.mask})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              ) : (
                <span className="block text-2xl font-bold uppercase leading-[0.95] tracking-tight md:text-3xl">
                  {cat.label.join(" ")}
                </span>
              )}
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
