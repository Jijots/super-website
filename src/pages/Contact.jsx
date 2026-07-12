export default function Contact() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <span className="text-sm uppercase tracking-wide text-ink/50">Let's work together</span>
      <h1 className="mt-2 font-display text-6xl leading-none text-super-red md:text-8xl">
        <a
          href="mailto:hello@super.ph"
          className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
        >
          hello@super.ph →
        </a>
      </h1>
      <p className="mt-8 max-w-xl text-lg md:text-2xl">
        Got a project, a collaboration idea, or just want to say hi? Drop us a line, we'd love to hear from you.
      </p>
    </section>
  );
}
