import { useCallback, useEffect, useRef, useState } from "react";
import { news } from "../data/news";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Geo asked for the selected article to sit lifted rather than flat, so the
// active card carries a hard offset shadow and its neighbours sit back,
// peeking in from either side. Scroll snapping gives real swipe on phones.
export default function News() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = news.length;

  const scrollTo = useCallback((i) => {
    // Set it straight away so arrows and dots stay correct even if the scroll
    // listener is throttled; swiping then keeps it in sync from the listener.
    setIndex(i);
    const track = trackRef.current;
    if (!track) return;
    const target = track.children[i];
    if (target) {
      track.scrollTo({
        left: target.offsetLeft - (track.clientWidth - target.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, []);

  // Keep the dots and lift in sync with wherever the reader has swiped to.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      [...track.children].forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.clientWidth / 2 - mid);
        if (dist < best) {
          best = dist;
          nearest = i;
        }
      });
      setIndex(nearest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const go = (delta) => scrollTo(Math.min(Math.max(index + delta, 0), count - 1));

  return (
    <section className="py-16">
      <h1 className="px-6 text-5xl font-bold uppercase tracking-tight text-super-red md:px-10 md:text-7xl">
        News
      </h1>

      <div className="relative mt-10">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[9vw] pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8 md:px-[22vw]"
        >
          {news.map((item, i) => {
            const active = i === index;
            return (
              <article
                key={item.url}
                className={`w-[82vw] shrink-0 snap-center transition-all duration-300 md:w-[56vw] ${
                  active ? "" : "opacity-45 md:scale-95"
                }`}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-full flex-col border-2 border-super-red bg-cream p-6 transition-all duration-300 md:p-8 ${
                    active
                      ? "-translate-x-1 -translate-y-1 shadow-[10px_10px_0_var(--color-ink)]"
                      : "shadow-none"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wide text-super-red/70 md:text-sm">
                    {item.publication} / {formatDate(item.date)}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-super-red md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-base text-ink/70 md:text-lg">{item.summary}</p>
                  <span className="mt-6 text-sm uppercase tracking-wide text-super-red">
                    Read more →
                  </span>
                </a>
              </article>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous article"
              disabled={index === 0}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-cream transition-opacity hover:opacity-80 disabled:opacity-25 md:left-8"
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next article"
              disabled={index === count - 1}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-cream transition-opacity hover:opacity-80 disabled:opacity-25 md:right-8"
            >
              ›
            </button>
          </>
        )}

        <div className="mt-6 flex justify-center gap-2">
          {news.map((item, i) => (
            <button
              key={item.url}
              onClick={() => scrollTo(i)}
              aria-label={`Go to article ${i + 1}`}
              aria-current={i === index}
              className={`h-2 transition-all ${
                i === index ? "w-6 bg-super-red" : "w-2 bg-super-red/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Publication logos still to come from Geo. */}
      <div className="mt-20 px-6 text-center md:px-10">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">
          As Featured On
        </h2>
        <p className="mt-4 text-sm uppercase tracking-wide text-ink/40">
          Publication logos coming soon
        </p>
      </div>
    </section>
  );
}
