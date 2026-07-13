import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { marqueeImages, projects } from "../data/projects";
import { useIntroDone } from "../context/IntroContext";

function slugFromSrc(src) {
  const match = src.match(/\/images\/projects\/([^/]+)\//);
  return match ? match[1] : null;
}

const WORDS = ["LET'S", "CREATE", "SOMETHING", "SUPER!"];

export default function Marquee() {
  const active = useIntroDone();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

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
        className="absolute inset-0 bg-ink/30 transition-opacity duration-300"
        style={{ opacity: showOverlay ? 1 : 0 }}
      />

      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 px-6 text-center">
        {WORDS.map((word, i) => (
          <span
            key={word}
            className="font-display text-5xl leading-tight text-cream transition-all duration-500 md:text-8xl"
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
