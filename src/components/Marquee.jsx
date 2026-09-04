import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { marqueeImages, projects } from "../data/projects";

function slugFromSrc(src) {
  const match = src.match(/\/images\/projects\/([^/]+)\//);
  return match ? match[1] : null;
}

export default function Marquee() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    // Sped up the slideshow interval from 4500ms to 2500ms
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % marqueeImages.length);
    }, 2500); 
    return () => clearInterval(id);
  }, [hovered]);

  const currentSlug = slugFromSrc(marqueeImages[index]);
  const project = projects.find((p) => p.slug === currentSlug);

  return (
    <Link
      to={currentSlug ? `/projects/${currentSlug}` : "/projects"}
      className="relative block aspect-video w-full overflow-hidden md:aspect-[21/9]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {marqueeImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          // Sped up the fade transition slightly to match the faster interval
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Stronger gradient overlay for foolproof contrast */}
      <div 
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-500" 
        style={{ opacity: hovered ? 1 : 0 }}
      />

      {project && (
        <div
          // Added text-cream, drop-shadow-lg, and pointer-events-none
          className="pointer-events-none absolute bottom-4 left-4 z-10 text-sm font-medium uppercase tracking-wide text-cream drop-shadow-lg transition-opacity duration-300 md:bottom-6 md:left-6 md:text-base"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {project.title} →
        </div>
      )}
    </Link>
  );
}