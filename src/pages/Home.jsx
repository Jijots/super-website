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
      {/* Hero Section - Animations are now gated by introDone */}
      <section className="flex flex-col justify-start px-6 pt-20 pb-32 md:px-10 md:pt-24 md:pb-48 lg:pb-64">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tighter text-super-anchor md:text-8xl lg:text-[9rem]">
            <span 
              className={`block transition-opacity duration-300 ${introDone ? "animate-page-enter opacity-100" : "opacity-0"}`} 
              style={{ animationDelay: "0ms" }}
            >
              Crafting
            </span>
            <span 
              className={`block font-sans lowercase italic tracking-normal text-super-anchor/40 transition-opacity duration-300 ${introDone ? "animate-page-enter opacity-100" : "opacity-0"}`} 
              style={{ animationDelay: "150ms" }}
            >
              bold
            </span>
            <span 
              className={`block transition-opacity duration-300 ${introDone ? "animate-page-enter opacity-100" : "opacity-0"}`} 
              style={{ animationDelay: "300ms" }}
            >
              Storytelling.
            </span>
          </h1>
        </div>
      </section>

      <Marquee />

      {/* About Section */}
      <section
        ref={aboutRef}
        className="grid gap-10 overflow-x-hidden px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32"
      >
        <h2
          className="font-display text-5xl leading-[1.05] text-super-anchor transition-all duration-700 md:text-7xl"
          style={{
            opacity: aboutInView ? 1 : 0,
            transform: aboutInView ? "translateY(0)" : "translateY(24px)",
          }}
        >
          WHAT THE
          <br />
          HECK IS
          <br />
          SUPER!?
        </h2>
        <div className="space-y-6 text-lg text-super-anchor/80 md:text-2xl">
          {[
            <>
              Super! is a Manila-based production company committed to bold, globally
              resonant storytelling.
            </>,
            <>
              Founded by Geo Lomuntad, producer of internationally recognized films such
              as <span className="text-super-accent">The Missing</span>, the Philippines'
              official submission to the 96th Academy Awards, Best Film at Animator
              International Animated Film Festival 2024, and Best Animated Film at the
              Asia Pacific Screen Awards 2024.
            </>,
            <>
              As well as <span className="text-super-accent">Sunshine</span>, which
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
              <span className="font-display text-xl uppercase leading-tight text-super-red md:text-2xl">
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
      <section ref={cardsRef} className="grid gap-8 px-6 pb-24 sm:grid-cols-2 md:px-10">
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
            <div className="aspect-video overflow-hidden rounded bg-super-anchor/5">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-sm text-super-anchor/70 transition-colors group-hover:text-super-accent">
              <span className="font-medium text-super-anchor">{p.title}</span>
              {p.director && <>, directed by {p.director}</>}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}