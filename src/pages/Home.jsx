import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import { projects } from "../data/projects";
import { useInView } from "../hooks/useInView";
import { useIntroDone } from "../context/IntroContext";

function Mark({ src, className }) {
  return (
    <img
      src={`/images/handwriting/${src}`}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute hidden max-w-none opacity-80 dark:invert md:block ${className}`}
    />
  );
}

// Flows inline right after the text it annotates, so it can never overlap
// an adjacent line the way an absolutely-positioned mark can.
function InlineMark({ src, className }) {
  return (
    <img
      src={`/images/handwriting/${src}`}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none mx-1 hidden h-6 max-w-none align-middle opacity-80 dark:invert md:inline-block ${className}`}
    />
  );
}

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
              Super! is a Manila-based but globally hungry production{" "}
              <InlineMark src="yes.png" className="-rotate-6" />{" "}
              company. We're dedicated to bold, globally resonant storytelling.
            </>,
            <>
              Our founder, Geo Lomuntad, has a <s className="decoration-2">pretty decent track record</s>
              <InlineMark src="seriously-impressive-resume.png" className="-rotate-2" />. He produced:
            </>,
            <>
              <span className="relative inline-block text-super-accent">
                The Missing
                <Mark
                  src="circle-1.png"
                  className="left-1/2 top-1/2 h-auto w-40 -translate-x-1/2 -translate-y-1/2 -rotate-2"
                />
              </span>{" "}
              — the Philippines' official submission to the 96th Academy Awards, Best Film
              (Animator International Animated FF 2024) and Best Animated Film (Asia
              Pacific Screen Awards 2024).
            </>,
            <>
              <span className="relative inline-block text-super-accent">
                Sunshine
                <Mark
                  src="circle-2.png"
                  className="left-1/2 top-1/2 h-auto w-32 -translate-x-1/2 -translate-y-1/2 rotate-1"
                />
              </span>{" "}
              — premiered at Toronto IFF 2024, Palm Springs IFF, and won the Crystal Bear
              for Best Film at the Berlin IFF.
            </>,
            <>
              Super! was born out of a genuine, slightly obsessive love for storytelling
              <InlineMark src="great-stories.png" className="-rotate-3" />. Our mission is
              simple: to show the world incredible Filipino and Asian stories (
              <s className="decoration-2">and maybe win a few more awards</s>
              <InlineMark src="blow-some-minds.png" className="-rotate-2" />).
            </>,
            <>
              What's next? We're currently developing Sentinel, a rotoscope animation
              selected at IFFR CineMart 2025 and Berlinale Talent Project Market 2025,
              and Pay the Bill, a project by Tribeca Film Festival 2024 Best
              International Narrative Feature winner Assel Aushakimova. We're committed to{" "}
              <s className="decoration-2">show you stuff you haven't seen before</s>
              <InlineMark src="fresh-perspective.png" className="rotate-1" />.
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

      {/* Cards Section */}
      <section ref={cardsRef} className="grid gap-8 px-6 pb-24 sm:grid-cols-2 md:px-10">
        {projects.map((p, i) => (
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
              {p.director && <> — directed by {p.director}</>}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}