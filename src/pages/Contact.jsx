export default function Contact() {
  return (
    <section className="px-6 py-16 md:px-10">
      <h1 className="font-display text-5xl text-super-red md:text-7xl">CONTACT</h1>
      <p className="mt-6 text-ink/70">Let's work together.</p>
      <a
        href="mailto:hello@super.ph"
        className="mt-2 inline-block text-lg underline decoration-super-red decoration-2 underline-offset-4"
      >
        hello@super.ph
      </a>
    </section>
  );
}
