import { useState } from "react";
import { news } from "../data/news";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Geo's 2.0 news artboard: outlined cards in a horizontal carousel with arrows
// and dots, rather than the plain stacked list.
export default function News() {
  const [index, setIndex] = useState(0);
  const count = news.length;

  const go = (delta) => setIndex((i) => (i + delta + count) % count);

  return (
    <section className="overflow-x-hidden px-6 py-16 md:px-10">
      <h1 className="font-display text-5xl text-super-red md:text-7xl">NEWS</h1>

      <div className="relative mt-10">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {news.map((item) => (
              <article key={item.url} className="w-full shrink-0 px-0 md:px-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border-2 border-super-red p-6 transition-colors hover:bg-super-red/5 md:p-8"
                >
                  <p className="text-xs uppercase tracking-wide text-super-red/70 md:text-sm">
                    {item.publication} / {formatDate(item.date)}
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-super-red md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-base text-ink/70 md:text-lg">{item.summary}</p>
                  <span className="mt-6 text-sm uppercase tracking-wide text-super-red">
                    Read more →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous article"
              className="absolute -left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-cream transition-opacity hover:opacity-80 md:-left-4"
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next article"
              className="absolute -right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-cream transition-opacity hover:opacity-80 md:-right-4"
            >
              ›
            </button>
          </>
        )}

        <div className="mt-8 flex justify-center gap-2">
          {news.map((item, i) => (
            <button
              key={item.url}
              onClick={() => setIndex(i)}
              aria-label={`Go to article ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-super-red" : "bg-super-red/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Publication logos still to come from Geo. */}
      <div className="mt-20 text-center">
        <h2 className="font-display text-3xl text-super-red md:text-5xl">AS FEATURED ON</h2>
        <p className="mt-4 text-sm uppercase tracking-wide text-ink/40">
          Publication logos coming soon
        </p>
      </div>
    </section>
  );
}
