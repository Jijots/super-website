import { useEffect, useState } from "react";
import { marqueeImages } from "../data/projects";

const PHRASE = "LET'S CREATE SOMETHING SUPER!";

export default function Marquee() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % marqueeImages.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden md:aspect-[21/9]">
      {marqueeImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex shrink-0 animate-marquee-slow items-center gap-16 whitespace-nowrap pr-16">
          {[0, 1].map((i) => (
            <span key={i} className="font-display text-6xl text-cream md:text-8xl">
              {PHRASE}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
