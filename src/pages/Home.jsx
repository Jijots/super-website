import { Link } from "react-router-dom";
import Marquee from "../components/Marquee";
import superLogo from "../assets/super-logo.png";
import { projects } from "../data/projects";
import { useInView } from "../hooks/useInView";

export default function Home() {
  const [cardsRef, cardsInView] = useInView();

  return (
    <>
      <section className="px-6 pb-2 pt-2 text-center md:px-10">
        <h1 id="hero-logo-target" className="mx-auto w-[70vw] max-w-3xl md:w-[40vw] md:max-w-md">
          <img src={superLogo} alt="SUPER!" className="block w-full" />
        </h1>
      </section>

      <Marquee />

      <section className="grid gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <h2 className="font-display text-6xl leading-[1.05] md:text-8xl">
          WHAT THE
          <br />
          HECK IS
          <br />
          SUPER!?
        </h2>
        <div className="space-y-6 text-lg text-super-red md:text-2xl">
          <p>
            Super! is a Manila-based but globally hungry production company. We're
            dedicated to bold, globally resonant storytelling.
          </p>
          <p>
            Our founder, Geo Lomuntad, has an impressive track record. He produced:
          </p>
          <p>
            <span className="underline decoration-2 underline-offset-2">The Missing</span>{" "}
            — the Philippines' official submission to the 96th Academy Awards, Best Film
            (Animator International Animated FF 2024) and Best Animated Film (Asia
            Pacific Screen Awards 2024).
          </p>
          <p>
            <span className="underline decoration-2 underline-offset-2">Sunshine</span> —
            premiered at Toronto IFF 2024, Palm Springs IFF, and won the Crystal Bear
            for Best Film at the Berlin IFF.
          </p>
          <p>
            What's next? We're currently developing Sentinel, a rotoscope animation
            selected at IFFR CineMart 2025 and Berlinale Talent Project Market 2025,
            and Pay the Bill, a project by Tribeca Film Festival 2024 Best
            International Narrative Feature winner Assel Aushakimova.
          </p>
        </div>
      </section>

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
            <div className="aspect-video overflow-hidden rounded bg-ink/5">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-sm text-super-red">
              <span className="font-medium">{p.title}</span>
              {p.director && <> — directed by {p.director}</>}
            </p>
          </Link>
        ))}
      </section>
    </>
  );
}
