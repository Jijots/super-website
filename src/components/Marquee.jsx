import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { marqueeImages, projects } from "../data/projects";
import { useIntroDone } from "../context/IntroContext";

function slugFromSrc(src) {
  const match = src.match(/\/images\/projects\/([^/]+)\//);
  return match ? match[1] : null;
}

const WORDS = ["LET'S", "CREATE", "SOMETHING", "SUPER!"];
const PHRASE = WORDS.join(" ");
const STAGGER_MS = WORDS.length * 150 + 500;

export default function Marquee() {
  const active = useIntroDone();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % marqueeImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, [hovered]);

  const currentSlug = slugFromSrc(marqueeImages[index]);
  const project = projects.find((p) => p.slug === currentSlug);
  const showOverlay = active && !hovered;
  const barIsRed = index % 2 === 1;

  // Words stagger in first; once settled, the phrase starts treadmilling.
  // Hovering hides the bar and resets the whole sequence, so it replays
  // stagger-then-scroll from scratch the next time it's shown.
  useEffect(() => {
    if (!showOverlay) {
      setScrolling(false);
      return;
    }
    const timer = setTimeout(() => setScrolling(true), STAGGER_MS);
    return () => clearTimeout(timer);
  }, [showOverlay]);

  return (
    <Link
      to={currentSlug ? `/projects/${currentSlug}` : "/projects"}
      className="relative block aspect-video overflow-hidden md:aspect-[21/9]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {marqueeImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        className={`absolute inset-x-0 bottom-0 overflow-hidden transition-all duration-500 ${
          barIsRed ? "bg-super-red" : "bg-ink"
        }`}
        style={{
          transform: showOverlay ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="py-4 md:py-6">
          {!scrolling ? (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 px-6 md:px-12">
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className={`font-display text-4xl leading-none transition-all duration-500 md:text-7xl ${
                    word === "SUPER!" && !barIsRed ? "text-super-red" : "text-cream"
                  }`}
                  style={{
                    opacity: showOverlay ? 1 : 0,
                    transform: showOverlay ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: showOverlay ? `${i * 150}ms` : "0ms",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex animate-treadmill items-baseline whitespace-nowrap">
              {[0, 1].map((copy) => (
                <span key={copy} className="flex items-baseline gap-x-3 md:gap-x-5">
                  {WORDS.map((word, i) => (
                    <span
                      key={i}
                      className={`font-display text-4xl leading-none md:text-7xl ${
                        word === "SUPER!" && !barIsRed ? "text-super-red" : "text-cream"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                  <span className="px-5 font-display text-4xl leading-none text-cream md:px-12 md:text-7xl">
                    ·
                  </span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {project && (
        <div
          className="absolute bottom-4 left-4 text-sm uppercase tracking-wide text-cream transition-opacity duration-300 md:bottom-6 md:left-6 md:text-base"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {project.title} →
        </div>
      )}
    </Link>
  );
}
