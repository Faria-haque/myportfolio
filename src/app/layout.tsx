import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { Footer, Nav } from "@/components/Nav";
import { LiquidFilter } from "@/components/Backdrop";
import Intro from "@/components/Intro";
import ClientEffects from "@/components/ClientEffects";
import "./globals.css";

const grotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-grotesk-face",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  // Set this to your production URL before deploying.
  metadataBase: new URL("https://example.com"),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.positioning,
  openGraph: { title: `${site.name} — ${site.role}`, description: site.positioning },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Runs before first paint, so the decision to play the intro never flashes.
const prePaint = `(function () {
  var d = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seen = false;
  try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch (e) {}
  if (location.pathname === "/" && !reduce && !seen && !location.hash) {
    d.classList.add("intro-on");
    // Failsafe: if the intro script never starts, reveal the site anyway.
    setTimeout(function () {
      if (!window.__introStarted) d.classList.remove("intro-on");
    }, 2500);
  }
  // backdrop-filter: url() refraction is Chromium-only.
  if (navigator.userAgentData && CSS.supports("backdrop-filter", "blur(1px)")) {
    d.classList.add("liquid");
  }
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The pre-paint script adds classes to <html> before React hydrates.
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body>
        <LiquidFilter />
        <Intro />

        <div className="site">
          {!site.minimal && <Nav />}
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          {!site.minimal && <Footer />}
        </div>

        <div className="grain" aria-hidden="true" />
        <ClientEffects />
      </body>
    </html>
  );
}
