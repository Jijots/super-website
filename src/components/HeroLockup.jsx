import { useEffect, useRef, useState } from "react";
import { advance } from "./heroBounce";

// Geo's three traced lines, at the offsets that make them interlock the way he
// drew them.
const LINES = [
  { src: "line-create", left: "0.33%", top: "0%", w: "99.67%", h: "25.48%", delay: 0 },
  { src: "line-something", left: "0.07%", top: "18.12%", w: "99.80%", h: "44.93%", delay: 260 },
  { src: "line-super", left: "0%", top: "66.55%", w: "99.61%", h: "33.45%", delay: 520 },
];

const RATIO = 1537 / 828;

// Cycled on every wall hit. All three are already in the palette, so the
// bounce never drops a colour the rest of the site does not use. Written as
// whole class names so Tailwind emits them, and so dark mode remaps them for
// free. An inline var() does not resolve on a descendant here.
const CYCLE = ["text-super-red", "text-ink", "text-brown"];

const SIT_FOR = 4200; // Long enough to read the name before it wanders off.
const SPEED = 46; // px per second, slow enough to stay legible while moving.
const MIN_WIDTH = 768; // Below this the hero has no room to wander, so it sits.

export default function HeroLockup({ introDone }) {
  const stageRef = useRef(null);
  const lockupRef = useRef(null);
  const releaseRef = useRef(null);
  // React owns className on the lockup, so the colour has to be React state or
  // the next render strips an imperatively added class. A bounce happens every
  // few seconds, so re-rendering on one costs nothing.
  const [colourIndex, setColourIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const lockup = lockupRef.current;
    if (!stage || !lockup) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let x = 0;
    let y = 0;
    let vx = 1;
    let vy = 1;
    let colour = 0;
    let released = false;
    let frame = 0;
    let last = 0;
    let timer = 0;

    function canWander() {
      return !reduced.matches && window.innerWidth >= MIN_WIDTH;
    }

    function size() {
      // Only shrink to leave room to move if it is actually going to move,
      // otherwise a phone gets a needlessly tiny hero.
      const w = Math.min(MIN_WIDTH, stage.clientWidth * (canWander() ? 0.62 : 0.94));
      lockup.style.width = `${w}px`;
      lockup.style.height = `${w / RATIO}px`;
    }

    function limits() {
      return {
        maxX: Math.max(0, stage.clientWidth - lockup.offsetWidth),
        maxY: Math.max(0, stage.clientHeight - lockup.offsetHeight),
      };
    }

    function draw() {
      lockup.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    }

    function centre() {
      const { maxX, maxY } = limits();
      x = maxX / 2;
      y = maxY / 2;
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

      // Nothing to compute while the hero is scrolled past.
      const rect = stage.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const next = advance({ x, y, vx, vy, colour }, dt, limits(), SPEED);
      ({ x, y, vx, vy, colour } = next);

      if (next.hitX || next.hitY) {
        setColourIndex(colour);
        // Both walls in one frame is the corner everybody waits for, so it
        // gets the same flicker the lockup arrives with.
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
      if (!released) centre();
      else {
        const { maxX, maxY } = limits();
        x = Math.min(x, maxX);
        y = Math.min(y, maxY);
        draw();
      }
    }

    size();
    centre();
    frame = requestAnimationFrame(step);

    // The lockup should be readable before it goes anywhere, so the timer only
    // starts once the intro has finished playing.
    if (introDone && canWander()) timer = setTimeout(release, SIT_FOR);

    window.addEventListener("resize", reset);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", reset);
    };
  }, [introDone]);

  return (
    <div
      ref={stageRef}
      onClick={() => releaseRef.current?.()}
      className="relative h-[70vh] w-full overflow-hidden"
    >
      <div
        ref={lockupRef}
        aria-label="Create something Super!"
        role="img"
        className={`absolute left-0 top-0 will-change-transform ${CYCLE[colourIndex]}`}
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
