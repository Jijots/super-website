import { Link } from "react-router-dom";
import { SERVICES } from "../data/services";
import Marquee from "../components/Marquee";
import { projects } from "../data/projects";
import { useInView } from "../hooks/useInView";
import { useIntroDone } from "../context/IntroContext";

export default function Home() {
  const introDone = useIntroDone();
  const [aboutRef, aboutInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  return (
    <>
      {/* Hero: each line traced from Geo's own artboard so his warp survives,
          drawn as a mask so it takes the theme colour, and flickering in one
          line at a time. */}
      <section className="flex min-h-[80vh] items-center px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <h1 aria-label="Create something Super!" className="block text-super-red">
            {[
              { src: "line-create", ratio: "1532 / 211", delay: 0 },
              { src: "line-something", ratio: "1534 / 372", delay: 260 },
              { src: "line-super", ratio: "1531 / 277", delay: 520 },
            ].map((line) => (
              <span
                key={line.src}
                aria-hidden="true"
                className={`block w-full ${introDone ? "animate-flicker" : "opacity-0"}`}
                style={{
                  aspectRatio: line.ratio,
                  backgroundColor: "currentColor",
                  WebkitMaskImage: `url(/images/hero/${line.src}.svg)`,
                  maskImage: `url(/images/hero/${line.src}.svg)`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  animationDelay: `${line.delay}ms`,
                }}
              />
            ))}
          </h1>

          <p
            className={`mt-10 text-xs uppercase tracking-[0.2em] text-ink/40 transition-opacity duration-700 ${
              introDone ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1600ms" }}
          >
            Scroll to see what the heck Super! is
          </p>
        </div>
      </section>

      <Marquee />

      {/* About Section */}
      <section
        ref={aboutRef}
        className="grid gap-10 overflow-x-hidden px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32"
      >
        <h2
          className="w-full self-start text-super-red transition-all duration-700"
          aria-label="What the heck is Super!?"
          style={{
            aspectRatio: "1361 / 198",
            backgroundColor: "currentColor",
            WebkitMaskImage: "url(/images/hero/what-the-heck-is-super.svg)",
            maskImage: "url(/images/hero/what-the-heck-is-super.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            opacity: aboutInView ? 1 : 0,
            transform: aboutInView ? "translateY(0)" : "translateY(24px)",
          }}
        />
        <div className="space-y-6 text-lg text-ink/80 md:text-2xl">
          {[
            <>
              Super! is a Manila-based production company committed to bold, globally
              resonant storytelling.
            </>,
            <>
              Founded by Geo Lomuntad, producer of internationally recognized films such
              as <span className="text-super-red">The Missing</span>, the Philippines'
              official submission to the 96th Academy Awards, Best Film at Animator
              International Animated Film Festival 2024, and Best Animated Film at the
              Asia Pacific Screen Awards 2024.
            </>,
            <>
              As well as <span className="text-super-red">Sunshine</span>, which
              premiered at Toronto International Film Festival 2024, Palm Springs
              International Film Festival, and winner of the Crystal Bear for Best Film
              at the Berlin International Film Festival 2025.
            </>,
            <>
              Super! continues to develop innovative projects, including Sentinel, a
              rotoscope animation selected for IFFR CineMart 2025 and the Berlinale
              Talent Project Market 2025. Super! remains dedicated to championing new
              perspectives and groundbreaking storytelling.
            </>,
          ].map((content, i) => (
            <p
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: aboutInView ? `${(i + 1) * 120}ms` : "0ms",
              }}
            >
              {content}
            </p>
          ))}
        </div>
      </section>

      {/* Services row: one line, three columns, links into the Services tab */}
      <section className="px-6 pb-24 md:px-10">
        <div className="grid border-y-2 border-super-red md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className={`group px-0 py-6 transition-colors hover:bg-super-red/5 md:px-6 md:py-8 ${
                i > 0 ? "border-t-2 border-super-red md:border-t-0 md:border-l-2" : ""
              }`}
            >
              <span className="text-xl font-bold uppercase leading-tight tracking-tight text-super-red md:text-2xl">
                {service.title}
              </span>
              <span className="mt-2 block text-xs uppercase tracking-wide text-ink/40 transition-colors group-hover:text-super-red">
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cards Section */}
      <section ref={cardsRef} className="grid px-6 pb-24 sm:grid-cols-2 md:px-10">
        {projects.filter((p) => p.cover).map((p, i) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group block transition-all duration-700"
            style={{
              opacity: cardsInView ? 1 : 0,
              transform: cardsInView ? "translateY(0)" : "translateY(24px)",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <div className="aspect-video overflow-hidden bg-ink/5">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm text-ink/70 transition-colors group-hover:text-super-red">
              <span className="font-medium text-ink">{p.title}</span>
              {p.director && <>, directed by {p.director}</>}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}