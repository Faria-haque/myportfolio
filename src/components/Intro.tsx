"use client";

// The crash → stuck loader → repair sequence. Rendered in the root layout, but it only
// plays when the pre-paint script put .intro-on on <html> (home page, first visit per
// session, motion allowed). Otherwise it unmounts immediately.

import { useEffect, useState } from "react";
import { runIntro } from "@/scripts/intro";
import "@/styles/components/intro.css";

export default function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.__introStarted) return; // Strict Mode re-runs effects in dev.
    if (document.documentElement.classList.contains("intro-on")) {
      runIntro(() => setDone(true));
    } else {
      setDone(true);
    }
  }, []);

  if (done) return null;

  return (
    <>
      <div className="intro" id="intro">
        <p className="sr-only" aria-live="polite">
          Intro animation playing. Use the Skip intro button to go straight to the content.
        </p>

        <div className="intro__log" aria-hidden="true">
          <p className="intro__line" data-text="> Loading portfolio..." />
          <p className="intro__line" data-text="> Fetching talent.exe..." />
          <p className="intro__line" data-text="> Resolving dependencies: confidence, coffee, taste" />
          <p className="intro__line intro__line--error" data-text="ERROR: talent not found" />
          <span className="intro__caret" />
        </div>

        <div className="intro__loader" aria-hidden="true">
          <div className="intro__bar">
            <div className="intro__fill" />
          </div>
          <div className="intro__meta">
            {/* Filled in by the intro script */}
            <span className="intro__pct" />
            <span className="intro__msg" />
          </div>
        </div>

        <button className="intro__fix" id="fixBtn" type="button">
          [ Fix it ]
        </button>
      </div>

      <button className="skip-intro" id="skipIntro" type="button">
        Skip intro
      </button>
    </>
  );
}
