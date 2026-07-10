import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "expand" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 500);
    const t2 = setTimeout(() => setPhase("out"), 1300);
    const t3 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[oklch(0.08_0.005_60)] transition-opacity duration-500 ease-marble ${phase === "out" ? "opacity-0" : "opacity-100"}`}
      aria-hidden
    >
      <div className="overflow-hidden">
        <div
          className={`display text-ink text-center transition-all duration-[1100ms] ease-marble ${
            phase === "in" ? "text-[clamp(1.2rem,2vw,1.8rem)] tracking-[0.4em]" : ""
          } ${
            phase === "expand" || phase === "out"
              ? "text-[clamp(6rem,22vw,26rem)] tracking-[-0.04em]"
              : ""
          }`}
          style={{ fontVariationSettings: '"wght" 900' }}
        >
          <span className="inline-block">ALIASGER</span>{" "}
          <span className="inline-block">SABIR</span>
        </div>
      </div>
    </div>
  );
}
