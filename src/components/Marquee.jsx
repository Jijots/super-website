import { useEffect, useState } from "react";
import { marqueeImages } from "../data/projects";

const ROWS = [
  { word: "LET'S", justify: "justify-end", sway: "animate-sway" },
  { word: "CREATE", justify: "justify-start", sway: "animate-sway-reverse" },
  { word: "SOMETHING", justify: "justify-end", sway: "animate-sway" },
  { word: "SUPER!", justify: "justify-center", sway: "animate-sway-reverse" },
];

export default function Marquee() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % marqueeImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden md:aspect-[21/9]">
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
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-0 flex flex-col justify-evenly px-6 md:px-12">
        {ROWS.map((row, i) => (
          <div key={i} className={`flex ${row.justify}`}>
            <span className={`whitespace-nowrap font-display text-7xl text-cream md:text-9xl ${row.sway}`}>
              {row.word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
