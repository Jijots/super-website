import { marqueeImages } from "../data/projects";

const WORDS = ["LET'S", "CREATE", "SOMETHING", "SUPER!"];

function Photo({ src }) {
  return (
    <div className="h-24 w-36 shrink-0 overflow-hidden rounded-md md:h-32 md:w-52">
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

function Row({ reverse, offset, imageOffset }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-8 pr-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      style={offset ? { marginLeft: offset } : undefined}
    >
      {Array.from({ length: 2 }).flatMap((_, i) =>
        WORDS.map((word, j) => {
          const imgIndex = (i * WORDS.length + j + imageOffset) % marqueeImages.length;
          return (
            <span key={`${i}-${j}`} className="flex items-center gap-8">
              <span className="font-display text-5xl text-super-red md:text-7xl">{word}</span>
              <Photo src={marqueeImages[imgIndex]} />
            </span>
          );
        }),
      )}
    </div>
  );
}

const ROWS = [
  { reverse: false, offset: undefined, imageOffset: 0 },
  { reverse: true, offset: "-3rem", imageOffset: 2 },
  { reverse: false, offset: "-6rem", imageOffset: 4 },
  { reverse: true, offset: undefined, imageOffset: 6 },
];

export default function Marquee() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden py-10">
      {ROWS.map((row, i) => (
        <div key={i} className="flex overflow-hidden">
          <Row reverse={row.reverse} offset={row.offset} imageOffset={row.imageOffset} />
        </div>
      ))}
    </div>
  );
}
