import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { advance } from "./heroBounce";

// Geo's three traced lines, at the offsets that make them interlock the way he
// drew them.
const LINES = [
  { src: "line-create", left: "0.33%", top: "0%", w: "99.67%", h: "25.48%", delay: 0 },
  { src: "line-something", left: "0.07%", top: "18.12%", w: "99.80%", h: "44.93%", delay: 260 },
  { src: "line-super", left: "0%", top: "66.55%", w: "99.61%", h: "33.45%", delay: 520 },
];

const RATIO = 1537 / 828;

// The full arcade set Geo picked, in his order. These are applied as an inline
// colour rather than Tailwind classes because they live outside the site
// palette, and the children paint themselves with currentColor.
const CYCLE = [
  "#F43837", // the house red, so it still starts on brand
  "#EFB8E7", // pink
  "#1B15D6", // blue
  "#16F03F", // green
  "#F7F219", // yellow
  "#F5801A", // orange
  "#18B5EF", // sky
  "#A31FE4", // purple
  "#F5209C", // magenta
];

const SIT_FOR = 3600; // Long enough to read the name before it wanders off.
const SPEED = 54; // px per second.
const MAX_W = 300; // Small, like the real screensaver.
const MIN_WIDTH = 768; // Below this there is no room to wander, so it sits.
const FILM_MS = 5600;

export default function HeroShowcase({ introDone, films }) {
  const stageRef = useRef(null);
  const lockupRef = useRef(null);
  const releaseRef = useRef(null);
  const [colourIndex, setColourIndex] = useState(0);
  const [film, setFilm] = useState(0);

  // Cross-fade the films underneath, independently of the bounce.
  useEffect(() => {
    if (films.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFilm((f) => (f + 1) % films.length), FILM_MS);
    return () => clearInterval(id);
  }, [films.length]);

  useEffect(() => {
    const stage = stageRef.current;
    const lockup = lockupRef.current;
    if (!stage || !lockup) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let x = 0, y = 0, vx = 1, vy = 1, colour = 0;
    let released = false, frame = 0, last = 0, timer = 0;

    function canWander() {
      return !reduced.matches && window.innerWidth >= MIN_WIDTH;
    }

    function size() {
      const w = Math.min(MAX_W, stage.clientWidth * 0.26);
      lockup.style.width = `${w}px`;
      lockup.style.height = `${w / RATIO}px`;
    }

    const TITLE_BAND = 0.3; // Bottom third belongs to the film title.

    function limits() {
      const roam = stage.clientHeight * (1 - TITLE_BAND);
      return {
        maxX: Math.max(0, stage.clientWidth - lockup.offsetWidth),
        maxY: Math.max(0, roam - lockup.offsetHeight),
      };
    }

    function draw() {
      lockup.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    }

    // At rest it sits in the upper third, clear of the film title in the middle.
    function park() {
      const { maxX, maxY } = limits();
      x = maxX / 2;
      y = canWander() ? maxY * 0.2 : maxY / 2;
      draw();
    }

    function release() {
      if (released || !canWander()) return;
      released = true;
      vx = Math.random() < 0.5 ? -1 : 1;
      vy = Math.random() < 0.5 ? -1 : 1;
    }
    releaseRef.current = release;

    function step(now) {
      frame = requestAnimationFrame(step);
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!released) return;

      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const next = advance({ x, y, vx, vy, colour }, dt, limits(), SPEED, CYCLE.length);
      ({ x, y, vx, vy, colour } = next);

      if (next.hitX || next.hitY) {
        setColourIndex(colour);
        if (next.corner) {
          lockup.classList.remove("animate-flicker");
          void lockup.offsetWidth;
          lockup.classList.add("animate-flicker");
        }
      }
      draw();
    }

    function reset() {
      size();
      if (!released) park();
      else {
        const { maxX, maxY } = limits();
        x = Math.min(x, maxX);
        y = Math.min(y, maxY);
        draw();
      }
    }

    size();
    park();
    frame = requestAnimationFrame(step);
    if (introDone && canWander()) timer = setTimeout(release, SIT_FOR);

    window.addEventListener("resize", reset);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", reset);
    };
  }, [introDone]);

  const current = films[film];

  return (
    <div
      ref={stageRef}
      onClick={() => releaseRef.current?.()}
      className="relative h-[78vh] min-h-[30rem] w-full overflow-hidden bg-ink"
    >
      {films.map((f, i) => (
        <img
          key={f.slug}
          src={f.cover}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === film ? 1 : 0 }}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Keeps the title and the lockup legible whatever the still is doing. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />

      {/* The film, named plainly. Geo asked for normal Space Grotesk here, not
          the display face, so the lettering above stays the loud thing. */}
      {current && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-[8%]">
          <Link
            to={`/projects/${current.slug}`}
            className="group block text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="block text-xl font-medium text-paper transition-colors group-hover:text-super-red md:text-2xl">
              {current.title}
              {current.year ? ` (${current.year})` : ""}
            </span>
            {current.director && (
              <span className="mt-1.5 block text-xs uppercase tracking-[0.18em] text-paper/70">
                dir. {current.director}
              </span>
            )}
          </Link>
        </div>
      )}

      <div
        ref={lockupRef}
        aria-label="Create something Super!"
        role="img"
        style={{ color: CYCLE[colourIndex] }}
        className="pointer-events-none absolute left-0 top-0 will-change-transform"
      >
        {LINES.map((line) => (
          <span
            key={line.src}
            aria-hidden="true"
            className={`absolute block ${introDone ? "animate-flicker" : "opacity-0"}`}
            style={{
              left: line.left,
              top: line.top,
              width: line.w,
              height: line.h,
              backgroundColor: "currentColor",
              WebkitMaskImage: `url(/images/hero/${line.src}.svg)`,
              maskImage: `url(/images/hero/${line.src}.svg)`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              animationDelay: `${line.delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
