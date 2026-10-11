import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./motion";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
    __introStarted?: boolean;
  }
}

/** Smooth scrolling for the whole app. Returns a cleanup function. */
export function initSmoothScroll() {
  const onIntroDone = () => {
    window.__lenis?.start();
    ScrollTrigger.refresh();
  };
  document.addEventListener("intro:done", onIntroDone);

  if (prefersReducedMotion()) {
    return () => document.removeEventListener("intro:done", onIntroDone);
  }

  const lenis = new Lenis({ anchors: true, lerp: 0.1 });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  if (document.documentElement.classList.contains("intro-on")) lenis.stop();

  return () => {
    document.removeEventListener("intro:done", onIntroDone);
    gsap.ticker.remove(tick);
    lenis.destroy();
    window.__lenis = undefined;
  };
}

/** Fade/slide `.reveal` elements in as they enter. Re-run per route; returns a cleanup. */
export function initReveals() {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const els = gsap.utils.toArray<HTMLElement>(".reveal");
    gsap.set(els, { y: 40, opacity: 0 });
    ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          // Leaving opacity/transform behind would break backdrop-filter on children.
          clearProps: "opacity,transform",
        }),
    });
  });
  ScrollTrigger.refresh();
  return () => ctx.revert();
}
