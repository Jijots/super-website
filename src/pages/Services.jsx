import { SERVICES } from "../data/services";

// Geo described this as a single row of three columns, like an Excel table,
// naming the services Super! offers. The landing page links into it.
export default function Services() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="text-5xl font-bold uppercase tracking-tight text-super-red md:text-7xl">What We Offer</h1>

      <div className="mt-12 grid border-y-2 border-super-red md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className={`scroll-mt-28 px-0 py-8 md:px-8 md:py-12 ${
              i > 0 ? "border-t-2 border-super-red md:border-t-0 md:border-l-2" : ""
            }`}
          >
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-super-red md:text-3xl">
              {service.title}
            </h2>
            {service.blurb ? (
              <p className="mt-4 text-base text-ink/70 md:text-lg">{service.blurb}</p>
            ) : (
              <p className="mt-4 text-sm uppercase tracking-wide text-ink/40">
                Copy coming soon
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
