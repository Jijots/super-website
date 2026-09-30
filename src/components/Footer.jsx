import { Link } from "react-router-dom";
import { contactEmail, contactLabel, socials } from "../data/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/company", label: "Company" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/news", label: "News" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-brown/30 px-6 pb-10 pt-16 md:px-10">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm uppercase tracking-wide text-ink/50">{contactLabel}</span>
        <a
          href={`mailto:${contactEmail}`}
          className="text-4xl font-bold text-super-red underline decoration-2 underline-offset-4 transition-colors hover:text-gold md:text-6xl"
        >
          {contactEmail} →
        </a>
      </div>

      <div className="mt-16 flex flex-col gap-8 border-t border-brown/30 pt-8 text-sm uppercase tracking-wide md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-6">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="transition-colors hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-6 text-ink/50">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-gold"
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
