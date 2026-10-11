import { gsap } from "gsap";
import { prefersReducedMotion } from "./motion";

const INTERACTIVE = "a, button, input, textarea, select, label, [data-cursor]";

/** Red dot cursor for fine pointers. Returns a cleanup function. */
export function initCursor(el: HTMLElement) {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};

  const root = document.documentElement;
  root.classList.add("has-cursor");
  const duration = prefersReducedMotion() ? 0 : 0.18;
  const x = gsap.quickTo(el, "x", { duration, ease: "power3.out" });
  const y = gsap.quickTo(el, "y", { duration, ease: "power3.out" });

  const onMove = (e: PointerEvent) => {
    x(e.clientX);
    y(e.clientY);
    el.classList.add("is-visible");
  };
  const onLeave = () => el.classList.remove("is-visible");
  const onOver = (e: PointerEvent) => {
    const target = e.target as Element | null;
    el.classList.toggle("is-hover", !!target?.closest(INTERACTIVE));
  };

  window.addEventListener("pointermove", onMove);
  document.addEventListener("pointerleave", onLeave);
  document.addEventListener("pointerover", onOver);

  return () => {
    root.classList.remove("has-cursor");
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("pointerover", onOver);
  };
}
