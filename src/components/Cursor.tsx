import { useEffect, useRef } from "react";

/**
 * Premium custom cursor:
 * - Outlined circle with smooth GSAP-free interpolation (rAF)
 * - Expands over links, becomes rounded square over data-project elements
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let dx = mx, dy = my;
    let mode: "default" | "link" | "project" = "default";

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;

      const el = e.target as HTMLElement | null;
      const project = el?.closest?.("[data-cursor='project']");
      const link = el?.closest?.("a, button, [role='button'], [data-cursor='link']");
      const next = project ? "project" : link ? "link" : "default";
      if (next !== mode) {
        mode = next;
        ring.dataset.mode = mode;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.24;
      ry += (my - ry) * 0.24;
      dx += (mx - dx) * 0.75;
      dy += (my - dy) * 0.75;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        data-mode="default"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block h-9 w-9 rounded-full border border-[oklch(0.94_0.01_80/0.55)] transition-[width,height,border-radius,background-color,border-color] duration-500 ease-marble data-[mode=link]:h-14 data-[mode=link]:w-14 data-[mode=link]:border-[oklch(0.72_0.13_55/0.7)] data-[mode=project]:h-24 data-[mode=project]:w-24 data-[mode=project]:rounded-[10%] data-[mode=project]:bg-[oklch(0.72_0.13_55/0.08)] data-[mode=project]:border-[oklch(0.72_0.13_55/0.4)]"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block h-[3px] w-[3px] rounded-full bg-ink/80"
      />
    </>
  );
}
