import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Loader } from "@/components/Loader";
import { Hero, About, Projects, Certificates, Contact } from "@/components/sections";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {mounted && !loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <SmoothScroll>
        <Nav />
        <main className="relative">
          <Hero />
          <About />
          <Projects />
          <Certificates />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
