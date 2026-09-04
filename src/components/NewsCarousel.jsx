import { useCallback, useEffect, useRef, useState } from "react";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// The selected article sits lifted on a hard offset shadow while its
// neighbours set back, and scroll snapping gives native swipe on phones.
export default function NewsCarousel({ items, size = "full" }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = items.length;

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

  // "full" is the standalone News page; "inset" sits inside a film page.
  const slide = size === "full" ? "w-[82vw] md:w-[56vw]" : "w-[78vw] md:w-[38vw]";
  const rail = size === "full" ? "px-[9vw] md:px-[22vw]" : "px-[11vw] md:px-[6vw]";

  if (!count) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8 ${rail}`}
      >
        {items.map((item, i) => {
          const active = i === index;
          return (
            <article
              key={item.url}
              className={`${slide} shrink-0 snap-center transition-all duration-300 ${
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
                <h3 className="mt-3 text-xl font-bold leading-tight text-super-red md:text-2xl">
                  {item.title}
                </h3>
                {item.summary && (
                  <p className="mt-4 text-base text-ink/70 md:text-lg">{item.summary}</p>
                )}
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
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-paper transition-opacity hover:opacity-80 disabled:opacity-25 md:left-6"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next article"
            disabled={index === count - 1}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-super-red text-paper transition-opacity hover:opacity-80 disabled:opacity-25 md:right-6"
          >
            ›
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {items.map((item, i) => (
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
        </>
      )}
    </div>
  );
}
