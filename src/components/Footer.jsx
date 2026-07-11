import { Link } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/company", label: "Company" },
  { to: "/projects", label: "Projects" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink/10 px-6 pb-10 pt-16 md:px-10">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm uppercase tracking-wide text-ink/50">Let's work together</span>
        <a
          href="mailto:hello@super.ph"
          className="font-display text-4xl text-super-red underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 md:text-6xl"
        >
          hello@super.ph →
        </a>
      </div>

      <div className="mt-16 flex flex-col gap-8 border-t border-ink/10 pt-8 text-sm uppercase tracking-wide md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-6">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="transition-opacity hover:opacity-60">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-6 text-ink/50">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-ink/40">
        © {new Date().getFullYear()} Super! Productions. All rights reserved.
      </p>
    </footer>
  );
}
