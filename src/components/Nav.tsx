import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

function AboutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function CertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const icons = [AboutIcon, ProjectsIcon, CertIcon, ContactIcon];

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
        {/* Mobile: outline icon links */}
        <ul className="flex sm:hidden items-center gap-4">
          {links.map((l, i) => {
            const Icon = icons[i];
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex items-center justify-center text-ink/60 hover:text-accent transition-colors duration-500"
                  aria-label={l.label}
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
