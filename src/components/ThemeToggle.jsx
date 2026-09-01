import { useEffect, useState } from "react";

// Follows the device's light/dark setting until the visitor makes an explicit
// choice, which is then remembered. Geo asked for this in the 2.0 review.
function getInitialDark() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Keep following the OS while the visitor hasn't overridden it.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!localStorage.getItem("theme")) setDark(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
      className="relative h-6 w-11 shrink-0 rounded-full bg-ink/15 transition-colors duration-300"
    >
      <span
        className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-super-red shadow-sm transition-transform duration-300"
        style={{ transform: dark ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}
