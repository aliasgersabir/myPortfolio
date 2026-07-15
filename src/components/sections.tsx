import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import alexander from "@/assets/hero-alexander.png";
import sculptor from "@/assets/craft-sculptor.png";
import leonardo from "@/assets/mastery-leonardo.png";
import veiled from "@/assets/veiled-virgin.png";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Reveal helper ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.6, ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/* ---------- Hero ---------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current || !wordRef.current) return;
    const ctx = gsap.context(() => {
      const letters = wordRef.current!.querySelectorAll<HTMLElement>("[data-letter]");
      gsap.set(letters, { yPercent: 120, rotate: 6, opacity: 0 });
      gsap.to(letters, {
        yPercent: 0, rotate: 0, opacity: 1,
        duration: 1.8, ease: "expo.out", stagger: 0.06, delay: 0.25,
      });
      gsap.from(imgRef.current, {
        yPercent: 8, opacity: 0, scale: 1.06, duration: 2.6, ease: "expo.out", delay: 0.55,
      });
      // subtle floating
      gsap.to(imgRef.current, {
        y: -14, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 3,
      });
      // parallax on scroll
      gsap.to(wordRef.current, {
        yPercent: -22, letterSpacing: "-0.02em",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(imgRef.current, {
        yPercent: -8, scale: 0.94,
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.4 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const letters = "DESIGNER".split("");

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute left-6 top-28 z-[3] flex flex-col gap-1 md:left-10">
        <span className="eyebrow">Exhibit N° 001</span>
        <span className="eyebrow text-ink/40">MMXXV — Personal Archive</span>
      </div>
      <div className="absolute right-6 top-28 z-[3] hidden flex-col items-end gap-1 md:flex md:right-10">
        <span className="eyebrow">Aliasger Sabir</span>
        <span className="eyebrow text-ink/40">Developer · Designer</span>
      </div>

      <h1
        ref={wordRef}
        className="display pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-ink/90 select-none text-[clamp(2.8rem,26vw,22rem)] leading-[0.78]"
        aria-label="Designer"
      >
        {letters.map((l, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <span data-letter className="inline-block will-change-transform">{l}</span>
          </span>
        ))}
      </h1>

      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <img
          ref={imgRef}
          src={alexander}
          alt="Alexander the Great — an oil study, mounted"
          className="h-[60vh] md:h-[92vh] w-auto max-w-none object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.75)]"
          draggable={false}
        />
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-[3] flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
        <span className="eyebrow">Scroll — Enter the room</span>
        <span className="eyebrow text-ink/40">I / VI</span>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
export function About() {
  const ref = useReveal<HTMLElement>();
  const veilRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const veilWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Unveiling: clip-path reveal from top, paired with a lift + slight rotation
      gsap.set(veilRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0, y: 80, scale: 1.08, rotate: -2,
      });
      gsap.to(veilRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1, y: 0, scale: 1, rotate: 0,
        duration: 2.6, ease: "expo.out",
        scrollTrigger: { trigger: veilWrapRef.current, start: "top 80%", once: true },
      });
      // Soft aged-gold halo pulse — the marble "breathes"
      gsap.fromTo(haloRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 2.4, ease: "expo.out",
          scrollTrigger: { trigger: veilWrapRef.current, start: "top 80%", once: true },
          onComplete: () => {
            gsap.to(haloRef.current, {
              scale: 1.08, opacity: 0.75,
              duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1,
            });
          }
        }
      );
      // Slow drift
      gsap.to(veilRef.current, {
        y: -18, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.6,
      });
      // Scroll parallax
      gsap.to(veilWrapRef.current, {
        yPercent: -14,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
      // Mouse parallax tilt — surprise responsiveness
      const wrap = veilWrapRef.current!;
      const qx = gsap.quickTo(veilRef.current!, "rotationY", { duration: 0.9, ease: "expo.out" });
      const qy = gsap.quickTo(veilRef.current!, "rotationX", { duration: 0.9, ease: "expo.out" });
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        qx(dx * 10);
        qy(-dy * 8);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref} id="about" className="relative w-full px-6 py-40 md:px-10 md:py-64">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <p data-reveal className="eyebrow">II — Notes on the maker</p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 data-reveal className="display text-ink text-[clamp(3.5rem,11vw,11rem)] leading-[0.85]">
            A quiet obsession with the{" "}
            <span className="relative inline-block text-accent italic font-[500]">
              details
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/70" />
            </span>{" "}
            no one notices.
          </h2>
        </div>

        {/* Veiled virgin — left column, beside the paragraph */}
        <div ref={veilWrapRef} className="col-span-12 md:col-span-4 mt-16 relative flex justify-center md:justify-end" style={{ perspective: "1400px" }}>
          <div
            ref={haloRef}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vh] rounded-full"
            style={{
              background: "radial-gradient(closest-side, oklch(0.72 0.13 55 / 0.22), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <img
            ref={veilRef}
            src={veiled}
            alt="The Veiled Virgin — marble bust, after Strazza"
            className="relative h-[46vh] md:h-[62vh] w-auto object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)] pointer-events-none select-none"
            style={{ filter: "brightness(0.96) contrast(1.06)", transformStyle: "preserve-3d", willChange: "transform" }}
            draggable={false}
          />
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-6 mt-16 self-center">
          <p data-reveal className="body-serif text-lg md:text-xl text-ink/80 max-w-md leading-relaxed">
            I build interfaces the way old craftsmen built cabinets — patient, opinionated,
            and quietly proud of the joinery you never see. My work sits between engineering
            and drawing: type as architecture, motion as breath, restraint as a first draft.
            A quiet obsession with{" "}
            <em className="not-italic relative inline-block text-accent font-normal">
              details
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent/70"
              />
            </em>{" "}
            no one notices.
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-11 mt-16 space-y-6">
          <div data-reveal>
            <p className="eyebrow mb-2">Currently</p>
            <p className="body-serif text-ink/85">Composing quiet, considered software — open to studio work and residencies.</p>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-2">Disciplines</p>
            <p className="body-serif text-ink/85">Frontend · Motion · Interaction · Typography · Systems</p>
          </div>
          <div data-reveal>
            <p className="eyebrow mb-2">Reading room</p>
            <p className="body-serif text-ink/85 italic">Massimo Vignelli, Dieter Rams, Ruder, Bringhurst.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
type Project = {
  rank: string;
  title: string;
  year: string;
  discipline: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  tone: string;
};

const PROJECTS: Project[] = [
  { rank: "I", title: "Halcyon", year: "2025", discipline: "Editorial engine",
    description: "A slow, opinionated writing environment. Prose treated as architecture — typography, rhythm and restraint over feature bloat.",
    stack: ["React","TanStack","Tiptap","Postgres"], github: "https://github.com/aliasgersabir", demo: "#", tone: "oklch(0.30 0.06 55)" },
  { rank: "II", title: "Marble", year: "2025", discipline: "Motion library",
    description: "A small design language of weighty, deliberate transitions. Every ease curve is measured, named and reusable.",
    stack: ["GSAP","Lenis","TypeScript"], github: "https://github.com/aliasgersabir", demo: "#", tone: "oklch(0.28 0.04 250)" },
  { rank: "III", title: "Atlas", year: "2024", discipline: "Data cartography",
    description: "Reading complex maps as literature — a study in layered legibility, cartographic hierarchy and quiet interaction.",
    stack: ["D3","Mapbox","React"], github: "https://github.com/aliasgersabir", demo: "#", tone: "oklch(0.32 0.07 140)" },
  { rank: "IV", title: "Verso", year: "2024", discipline: "Reading environment",
    description: "A typography-first interface for research and the long form. Footnotes, marginalia and citations elevated to first-class citizens.",
    stack: ["Next","MDX","Tailwind"], github: "https://github.com/aliasgersabir", demo: "#", tone: "oklch(0.30 0.06 30)" },
  { rank: "V", title: "Vesper", year: "2023", discipline: "Ambient app",
    description: "A candle-lit companion for the last hour of the day. Slow interactions, low light, generous silence.",
    stack: ["Swift","Metal","CoreAudio"], github: "https://github.com/aliasgersabir", demo: "#", tone: "oklch(0.26 0.05 320)" },
];

function ProjectCover({ p }: { p: Project }) {
  return (
    <div
      className="relative aspect-[3/4] w-[72vw] max-w-[420px] md:w-[30vw] md:max-w-[520px]"
      style={{
        background: `linear-gradient(155deg, ${p.tone} 0%, oklch(0.11 0.005 60) 100%)`,
        boxShadow: "0 80px 140px -30px rgba(0,0,0,0.9), inset 0 0 0 1px oklch(1 0 0 / 0.08)",
      }}
    >
      <div className="absolute left-5 top-5"><span className="eyebrow text-ink/60">N° {p.rank}</span></div>
      <div className="absolute right-5 top-5"><span className="eyebrow text-ink/45">{p.year}</span></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="display leading-[0.82] text-ink" style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)", letterSpacing: "-0.04em" }}>
          {p.title}
        </span>
        <span className="mt-5 h-px w-14 bg-accent/70" aria-hidden />
        <span className="body-serif italic text-ink/70 mt-4 text-sm md:text-base">{p.discipline}</span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23g)'/></svg>\")",
        }}
      />
    </div>
  );
}

/* Intro — CRAFT + sculptor, its own scroll act */
function CraftIntro() {
  const ref = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(wordRef.current, {
        yPercent: 30, opacity: 0, duration: 1.8, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
      gsap.from(imgRef.current, {
        yPercent: 20, opacity: 0, scale: 1.1, duration: 2.2, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
      // Scroll-driven cinematic exit — CRAFT slides + sculptor drifts left / fades
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current, start: "center center", end: "bottom top",
          scrub: 1.2, pin: false,
        },
      })
        .to(wordRef.current, { xPercent: -18, yPercent: -20, letterSpacing: "0.05em", opacity: 0.15 }, 0)
        .to(imgRef.current, { xPercent: -40, scale: 0.7, opacity: 0, rotate: -3 }, 0);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-[110svh] w-full overflow-hidden">
      <p className="eyebrow absolute left-6 top-16 z-[3] md:left-10">III — The gallery</p>
      <p className="eyebrow absolute right-6 top-16 z-[3] text-ink/40 md:right-10">Enter the room</p>

      <h2
        ref={wordRef}
        className="display pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-ink/90 select-none text-[clamp(5rem,24vw,22rem)] leading-[0.82]"
      >
        CRAFT
      </h2>
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <img
          ref={imgRef}
          src={sculptor}
          alt="Il Genio — sculpture in bronze"
          className="h-[86vh] w-auto max-w-none object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.8)]"
          draggable={false}
        />
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-[3] flex flex-col items-center gap-2">
        <span className="eyebrow text-ink/50">Scroll — the sculpture yields to the gallery</span>
        <span className="h-6 w-px bg-ink/30 animate-pulse" aria-hidden />
      </div>
    </section>
  );
}

/* Gallery — slanted 3D carousel (Apple 100 Best inspired interaction),
   arrow buttons + keyboard nav. State-driven. */
function ProjectGallery() {
  const ref = useRef<HTMLElement>(null);
  const framesWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = PROJECTS.length;

  const layout = useCallback((idx: number) => {
    const frames = Array.from(
      framesWrapRef.current?.querySelectorAll<HTMLElement>("[data-frame]") ?? []
    );
    frames.forEach((f, i) => {
      const off = i - idx;
      const abs = Math.abs(off);
      const dir = Math.sign(off);
      // Slant + slide — Apple 100 Best albums feel
      const x = off * 34; // vw
      const rotY = -dir * Math.min(28, abs * 14); // slant toward center
      const rotZ = dir * Math.min(4, abs * 2);
      const scale = Math.max(0.55, 1 - abs * 0.14);
      const opacity = abs > 3 ? 0 : abs > 2 ? 0.35 : abs > 1 ? 0.7 : 1;
      const blur = abs < 0.3 ? 0 : Math.min(5, abs * 1.6);
      const y = abs * 12;
      gsap.to(f, {
        xPercent: -50, yPercent: -50,
        x: `${x}vw`, y,
        scale, rotationY: rotY, rotationZ: rotZ,
        opacity, filter: `blur(${blur}px)`,
        zIndex: 100 - Math.round(abs * 10),
        duration: 1.1, ease: "expo.out", overwrite: "auto",
      });
    });
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setActive((v) => Math.max(0, Math.min(N - 1, v + dir)));
  }, [N]);

  useEffect(() => { layout(active); }, [active, layout]);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(framesWrapRef.current, {
        opacity: 0, y: 60, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const p = PROJECTS[active];

  return (
    <section ref={ref} id="projects" className="relative min-h-[100svh] w-full overflow-hidden py-24">
      <div className="absolute left-6 top-10 z-[3] md:left-10">
        <span className="eyebrow">The Gallery</span>
      </div>
      <div className="absolute right-6 top-10 z-[3] md:right-10">
        <span className="eyebrow text-ink/40">
          {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </span>
      </div>

      {/* Frames */}
      <div
        ref={framesWrapRef}
        className="relative mx-auto h-[72svh] w-full"
        style={{ perspective: "1800px" }}
      >
        {PROJECTS.map((proj) => (
          <div
            key={proj.rank}
            data-frame
            data-cursor="project"
            className="absolute left-1/2 top-1/2 flex items-center justify-center"
            style={{ willChange: "transform, opacity, filter", transformStyle: "preserve-3d" }}
          >
            <ProjectCover p={proj} />
          </div>
        ))}
      </div>

      {/* Arrows — far left / far right */}
      <button
        onClick={() => go(-1)}
        disabled={active === 0}
        aria-label="Previous project"
        className="group absolute left-4 top-1/2 z-[6] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border border-ink/20 bg-paper/40 backdrop-blur-md transition-all duration-500 hover:border-accent/70 hover:bg-paper/60 disabled:opacity-20 disabled:cursor-not-allowed md:left-10 md:h-20 md:w-20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:-translate-x-1">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => go(1)}
        disabled={active === N - 1}
        aria-label="Next project"
        className="group absolute right-4 top-1/2 z-[6] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border border-ink/20 bg-paper/40 backdrop-blur-md transition-all duration-500 hover:border-accent/70 hover:bg-paper/60 disabled:opacity-20 disabled:cursor-not-allowed md:right-10 md:h-20 md:w-20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Caption */}
      <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-[5] flex flex-col items-center px-6 text-center">
        <span className="eyebrow text-ink/50">Exhibit {p.rank} · {p.year}</span>
        <h3 key={p.title} className="display text-ink mt-2 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-none animate-[fade-in_0.6s_ease-out]">
          {p.title}
        </h3>
        <p key={p.description} className="body-serif mt-3 max-w-xl text-sm md:text-base text-ink/70 leading-relaxed animate-[fade-in_0.7s_ease-out]">
          {p.description}
        </p>
        <div className="pointer-events-auto mt-5 flex items-center gap-6">
          <a href={p.demo} target="_blank" rel="noreferrer"
             className="eyebrow text-ink/90 hover:text-accent transition-colors duration-500 border-b border-ink/40 hover:border-accent pb-1">
            Live Demo →
          </a>
          <a href={p.github} target="_blank" rel="noreferrer"
             className="eyebrow text-ink/70 hover:text-accent transition-colors duration-500 border-b border-ink/20 hover:border-accent pb-1">
            GitHub ↗
          </a>
        </div>
        <span className="eyebrow text-ink/30 mt-6 hidden md:block">← → arrow keys to navigate</span>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <>
      <CraftIntro />
      <ProjectGallery />
    </>
  );
}

/* ---------- Certificates ---------- */
const CERTS = [
  { title: "Advanced React Patterns", org: "Frontend Masters", year: "2025" },
  { title: "Motion for the Web", org: "School of Motion", year: "2024" },
  { title: "Typography in Practice", org: "Type@Cooper", year: "2024" },
  { title: "First in Athletic Race", org: "Inter-college Championship", year: "2023" },
  { title: "Human Interface Systems", org: "IDEO U", year: "2023" },
  { title: "Design Engineering", org: "Vercel Ship", year: "2023" },
];

export function Certificates() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const leoRef = useRef<HTMLImageElement>(null);
  const idx = useRef(0);

  const move = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const max = CERTS.length - 1;
    idx.current = Math.max(0, Math.min(max, idx.current + dir));
    gsap.to(track, { xPercent: -idx.current * 100, duration: 1.2, ease: "expo.inOut" });
  };

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(wordRef.current, {
        yPercent: 10, opacity: 0, duration: 2, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.from(leoRef.current, {
        opacity: 0, scale: 1.04, duration: 2.4, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.to(leoRef.current, {
        yPercent: -6,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="certificates" className="relative w-full overflow-hidden py-32 md:py-48">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="eyebrow mb-6 text-center">IV — A record of study</p>
        <div className="relative mx-auto flex flex-col items-center justify-center w-full md:flex-row md:h-[78vh] md:items-center">
          <h2
            ref={wordRef}
            className="display pointer-events-none whitespace-nowrap text-ink/90 select-none leading-[0.82] z-[1] text-[clamp(3rem,18vw,18rem)] md:text-[clamp(4rem,20vw,18rem)] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 mb-4 md:mb-0"
          >
            MASTERY
          </h2>
          <img
            ref={leoRef}
            src={leonardo}
            alt="Leonardo — an engraved portrait, after the master"
            className="relative z-[2] h-[42vh] md:h-full w-auto max-w-none object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)] md:h-full"
            style={{ filter: "contrast(1.05) brightness(1.02)" }}
            draggable={false}
          />
        </div>
        <p className="body-serif italic text-ink/50 text-sm mt-4 text-center">— Leonardo, after the master</p>
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-[1400px] px-6 md:mt-28 md:px-10">
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-full">
            {CERTS.map((c, i) => (
              <article key={c.title} className="w-full flex-shrink-0 grid grid-cols-12 items-end gap-6 pr-0">
                <span className="col-span-2 eyebrow text-ink/50">
                  {String(i + 1).padStart(2, "0")} / {String(CERTS.length).padStart(2, "0")}
                </span>
                <h3 className="col-span-12 md:col-span-7 display text-ink text-[clamp(2.6rem,7vw,6rem)] leading-[0.9]">
                  {c.title}
                </h3>
                <div className="col-span-12 md:col-span-3 md:text-right space-y-1">
                  <p className="body-serif italic text-ink/70">{c.org}</p>
                  <p className="eyebrow text-ink/40">{c.year}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-border pt-6">
          <button onClick={() => move(-1)} className="eyebrow text-ink/70 hover:text-accent transition-colors duration-500" aria-label="Previous certificate">← Prev</button>
          <span className="eyebrow text-ink/40">Slide gently</span>
          <button onClick={() => move(1)} className="eyebrow text-ink/70 hover:text-accent transition-colors duration-500" aria-label="Next certificate">Next →</button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(wordRef.current, { x: 0, y: 0 }, {
        xPercent: -6, yPercent: 10, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom bottom", scrub: 1.2 },
      });
      gsap.from(infoRef.current, {
        opacity: 0, x: 40, duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 py-32 md:px-10">
      <div className="flex items-baseline justify-between border-t border-border pt-6">
        <p className="eyebrow">V — Correspondence</p>
        <p className="eyebrow text-ink/40">Open a small door</p>
      </div>

      <div className="relative grid flex-1 grid-cols-12 items-center gap-8 py-16">
        <h2 ref={wordRef} className="col-span-12 md:col-span-8 display text-ink text-[clamp(4rem,14vw,15rem)] leading-[0.82] pointer-events-none">
          LET&rsquo;S<br />
          <em className="italic font-light text-ink/70">connect.</em>
        </h2>

        <div ref={infoRef} className="col-span-12 md:col-span-4 space-y-8 md:text-right">
          <div>
            <p className="eyebrow mb-2">Email</p>
            <a href="mailto:aliasgarsabir123@gmail.com" className="body-serif text-xl md:text-2xl break-all text-ink hover:text-accent transition-colors duration-500">
              aliasgarsabir123@gmail.com
            </a>
          </div>
          <div>
            <p className="eyebrow mb-2">LinkedIn</p>
            <a href="https://linkedin.com/in/aliasger-sabir-918b6a35a" target="_blank" rel="noreferrer" className="body-serif text-lg md:text-xl text-ink/85 hover:text-accent transition-colors duration-500">
              /in/aliasger-sabir-918b6a35a
            </a>
          </div>
          <div>
            <p className="eyebrow mb-2">GitHub</p>
            <a href="https://github.com/aliasgersabir" target="_blank" rel="noreferrer" className="body-serif text-lg md:text-xl text-ink/85 hover:text-accent transition-colors duration-500">
              @aliasgersabir
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-border pt-6">
        <span className="eyebrow text-ink/40">© MMXXV · Aliasger Sabir</span>
        <span className="eyebrow text-ink/40">End of exhibit</span>
      </div>
    </section>
  );
}
