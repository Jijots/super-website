import Marquee from "../components/Marquee";
import superLogo from "../assets/super-logo.png";

export default function Home() {
  return (
    <>
      <section className="px-6 pb-2 pt-2 text-center md:px-10">
        <h1 className="mx-auto w-[70vw] max-w-3xl">
          <img src={superLogo} alt="SUPER!" className="block w-full" />
        </h1>
      </section>

      <Marquee />

      <section className="grid gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <h2 className="font-display text-6xl leading-[1.05] md:text-8xl">
          WHAT
          <br />
          IS
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
    </>
  );
}
