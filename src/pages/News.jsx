import NewsCarousel from "../components/NewsCarousel";
import { news } from "../data/news";

export default function News() {
  return (
    <section className="py-16">
      <h1 className="px-6 text-5xl font-bold uppercase tracking-tight text-super-red md:px-10 md:text-7xl">
        News
      </h1>

      <div className="mt-10">
        <NewsCarousel items={news} />
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
