import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About", icon: "👤" },
  { href: "#projects", label: "Projects", icon: "🧩" },
  { href: "#certificates", label: "Certificates", icon: "🎓" },
  { href: "#contact", label: "Contact", icon: "C" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 top-6 z-[150] flex justify-center px-4 pointer-events-none"
      aria-label="Primary"
    >
      <div
        className={`pointer-events-auto flex items-center gap-4 sm:gap-8 rounded-full border px-4 sm:px-6 py-3 will-change-[background-color,border-color] ease-marble transition-[background-color,border-color,backdrop-filter] duration-700 ${
          solid
            ? "border-[oklch(1_0_0/0.08)] bg-[oklch(0.14_0.005_60/0.62)] backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-0"
        }`}
      >
        <a
          href="#top"
          className="display text-[0.78rem] uppercase tracking-[0.32em] text-ink/90 hover:text-accent transition-colors whitespace-nowrap"
          style={{ fontStretch: "100%" }}
        >
          Aliasger Sabir
        </a>
        <span className="hidden sm:block h-4 w-px bg-border" aria-hidden />
        {/* Desktop: full text labels */}
        <ul className="hidden sm:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="eyebrow text-ink/70 hover:text-accent transition-colors duration-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile: icon links */}
        <ul className="flex sm:hidden items-center gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-ink/15 bg-ink/5 text-ink/80 hover:text-accent hover:border-accent/50 transition-colors duration-500 text-sm"
                aria-label={l.label}
                style={l.icon === "C" ? { fontFamily: "var(--font-display)", fontWeight: 700 } : undefined}
              >
                {l.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
