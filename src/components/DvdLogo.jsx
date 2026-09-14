import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { advance } from "./heroBounce";

// Geo's three traced lines, at the offsets that make them interlock the way he
// drew them.
const LINES = [
  { src: "line-create", left: "0.33%", top: "0%", w: "99.67%", h: "25.48%" },
  { src: "line-something", left: "0.07%", top: "18.12%", w: "99.80%", h: "44.93%" },
  { src: "line-super", left: "0%", top: "66.55%", w: "99.61%", h: "33.45%" },
];

const RATIO = 1537 / 828;

// The full arcade set Geo picked, in his order.
const CYCLE = [
  "#F43837", // the house red, so it starts on brand
  "#EFB8E7", // pink
  "#1B15D6", // blue
  "#16F03F", // green
  "#F7F219", // yellow
  "#F5801A", // orange
  "#18B5EF", // sky
  "#A31FE4", // purple
  "#F5209C", // magenta
];

const SPEED = 58; // px per second
const NAV_H = 76; // keep clear of the sticky navbar

/**
 * Floats above the whole page and bounces off the edges of the window, the way
 * the DVD player logo does. Fixed rather than absolute, so it stays on screen
 * as you scroll instead of being stranded somewhere up the document.
 *
 * Rendered through a portal into the body: the page transition leaves a
 * transform on an ancestor, and a transformed ancestor makes position: fixed
 * resolve against itself rather than the window.
 */
export default function DvdLogo() {
  const ref = useRef(null);
  const [colourIndex, setColourIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return; // A logo circling the page is exactly what reduced motion is for.

    let x = 0, y = 0, vx = 1, vy = 1, colour = 0;
    let frame = 0, last = 0;

    function size() {
      // Smaller share of a phone screen than a desktop one, so it stays a
      // detail rather than covering what you are reading.
      const vw = window.innerWidth;
      const w = vw < 768 ? Math.min(180, vw * 0.44) : Math.min(300, vw * 0.22);
      el.style.width = `${w}px`;
      el.style.height = `${w / RATIO}px`;
    }

    function limits() {
      return {
        maxX: Math.max(0, window.innerWidth - el.offsetWidth),
        maxY: Math.max(0, window.innerHeight - el.offsetHeight - NAV_H),
      };
    }

    function draw() {
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y + NAV_H)}px, 0)`;
    }

    function step(now) {
      frame = requestAnimationFrame(step);
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const next = advance({ x, y, vx, vy, colour }, dt, limits(), SPEED, CYCLE.length);
      ({ x, y, vx, vy, colour } = next);

      if (next.hitX || next.hitY) {
        setColourIndex(colour);
        if (next.corner) {
          el.classList.remove("animate-flicker");
          void el.offsetWidth;
          el.classList.add("animate-flicker");
        }
      }
      draw();
    }

    size();
    const { maxX, maxY } = limits();
    x = maxX * (0.25 + Math.random() * 0.5);
    y = maxY * (0.2 + Math.random() * 0.4);
    vx = Math.random() < 0.5 ? -1 : 1;
    vy = Math.random() < 0.5 ? -1 : 1;
    draw();
    setReady(true);

    frame = requestAnimationFrame(step);

    function onResize() {
      size();
      const l = limits();
      x = Math.min(x, l.maxX);
      y = Math.min(y, l.maxY);
      draw();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return createPortal(
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        color: CYCLE[colourIndex],
        opacity: ready ? 1 : 0,
        // Reads over a pale section as well as a dark film still.
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
      }}
      className="pointer-events-none fixed left-0 top-0 z-40 transition-opacity duration-700 will-change-transform"
    >
      {LINES.map((line) => (
        <span
          key={line.src}
          className="absolute block"
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
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
