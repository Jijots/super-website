import { useEffect, useState } from "react";
import { marqueeImages } from "../data/projects";

const ROWS = [
  { word: "LET'S", justify: "justify-end", reverse: false },
  { word: "CREATE", justify: "justify-start", reverse: true },
  { word: "SOMETHING", justify: "justify-end", reverse: false },
  { word: "SUPER!", justify: "justify-center", reverse: true },
];

export default function Marquee() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % marqueeImages.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden md:aspect-[21/9]">
      {marqueeImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-0 flex flex-col justify-around py-6">
        {ROWS.map((row, i) => (
          <div key={i} className={`flex overflow-hidden ${row.justify}`}>
            <div
              className={`flex shrink-0 items-center gap-16 whitespace-nowrap pr-16 ${
                row.reverse ? "animate-marquee-reverse-slow" : "animate-marquee-slow"
              }`}
            >
              {[0, 1].map((j) => (
                <span key={j} className="font-display text-4xl text-cream md:text-7xl">
                  {row.word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
