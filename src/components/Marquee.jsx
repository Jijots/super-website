import { useEffect, useState } from "react";
import { marqueeImages } from "../data/projects";

const ROWS = [
  { word: "LET'S", reverse: false },
  { word: "CREATE", reverse: true },
  { word: "SOMETHING", reverse: false },
  { word: "SUPER!", reverse: true },
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
      <div className="absolute inset-0 flex flex-col justify-evenly">
        {ROWS.map((row, i) => (
          <div key={i} className="relative h-1/4 overflow-hidden">
            <span
              className={`absolute left-0 top-1/2 whitespace-nowrap font-display text-7xl text-cream md:text-9xl ${
                row.reverse ? "animate-drift-reverse" : "animate-drift"
              }`}
            >
              {row.word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
