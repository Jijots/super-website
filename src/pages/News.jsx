import NewsCarousel from "../components/NewsCarousel";
import { news } from "../data/news";
import { publications } from "../data/site";

export default function News() {
  return (
    <section className="py-16">
      <h1 className="px-6 text-5xl font-bold uppercase tracking-tight text-super-red md:px-10 md:text-7xl">
        News
      </h1>

      <div className="mt-10">
        <NewsCarousel items={news} />
      </div>

      {/* Only shown once there are logos to show, so the page never carries an
          empty promise. Added through the site manager. */}
      {publications.length > 0 && (
        <div className="mt-20 px-6 md:px-10">
          <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-super-red md:text-5xl">
            As Featured On
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {publications.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                title={p.name}
                className="h-8 w-auto opacity-60 transition-opacity hover:opacity-100 md:h-10"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
