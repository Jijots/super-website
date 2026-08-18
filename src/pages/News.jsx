import { news } from "../data/news";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function News() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="font-display text-5xl text-super-red md:text-7xl">NEWS</h1>

      <div className="mt-10 divide-y divide-brown/30 border-t border-brown/30">
        {news.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group block gap-6 py-8 transition-colors md:flex md:items-baseline md:justify-between"
          >
            <div className="md:max-w-2xl">
              <p className="text-sm uppercase tracking-wide text-ink/50">
                {item.publication} — {formatDate(item.date)}
              </p>
              <h2 className="mt-2 font-display text-2xl transition-colors group-hover:text-super-red md:text-3xl">
                {item.title}
              </h2>
              <p className="mt-2 text-base text-ink/70 md:text-lg">{item.summary}</p>
            </div>
            <span className="mt-4 block shrink-0 text-sm uppercase tracking-wide text-ink/50 transition-colors group-hover:text-super-red md:mt-0">
              Read more →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
