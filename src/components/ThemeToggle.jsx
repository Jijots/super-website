import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
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
