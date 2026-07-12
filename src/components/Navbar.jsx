import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import superLogo from "../assets/super-logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/company", label: "Company" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-5 transition-[backdrop-filter,background-color,box-shadow] duration-300 md:px-10 ${
        scrolled ? "bg-cream/70 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <NavLink to="/" className="block">
        <img src={superLogo} alt="SUPER!" className="h-6 w-auto md:h-7" />
      </NavLink>

      <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wide md:flex">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `transition-opacity hover:opacity-60 ${isActive ? "underline underline-offset-4" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        aria-label="Toggle menu"
        className="flex flex-col gap-1.5 md:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full flex flex-col gap-4 bg-cream px-6 py-6 text-sm font-medium uppercase tracking-wide shadow-md md:hidden">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
