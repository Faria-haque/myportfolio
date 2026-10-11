"use client";

// App-wide motion: Lenis smooth scroll and the red cursor (once), plus scroll
// reveals (re-initialised on every route change).

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initReveals, initSmoothScroll } from "@/scripts/scroll";
import { initCursor } from "@/scripts/cursor";

export default function ClientEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const stopCursor = cursor.current ? initCursor(cursor.current) : () => {};
    return () => {
      stopScroll();
      stopCursor();
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) window.__lenis?.scrollTo(0, { immediate: true });
    return initReveals();
  }, [pathname]);

  return <div className="cursor" ref={cursor} aria-hidden="true" />;
}
