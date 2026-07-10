import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
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
      </div>
    </nav>
  );
}
