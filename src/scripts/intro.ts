import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const STATUS_MESSAGES = [
  "Almost there",
  "Okay, really almost there",
  "Reticulating splines",
  "Have you tried turning it off and on again?",
  "Loading confidence... 99%",
];

const SCRAMBLE_GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/** Runs the intro. `onDone` lets React unmount the overlay once the site is revealed. */
export function runIntro(onDone: () => void) {
  window.__introStarted = true;

  const root = document.documentElement;
  const intro = document.getElementById("intro")!;
  const skipBtn = document.getElementById("skipIntro") as HTMLButtonElement;
  const fixBtn = document.getElementById("fixBtn") as HTMLButtonElement;
  const site = document.querySelector<HTMLElement>(".site")!;
  const lines = gsap.utils.toArray<HTMLElement>(".intro__line", intro);
  const caret = intro.querySelector<HTMLElement>(".intro__caret")!;
  const loader = intro.querySelector<HTMLElement>(".intro__loader")!;
  const fill = intro.querySelector<HTMLElement>(".intro__fill")!;
  const pct = intro.querySelector<HTMLElement>(".intro__pct")!;
  const msg = intro.querySelector<HTMLElement>(".intro__msg")!;
  const backdropLayers = gsap.utils.toArray<HTMLElement>(".backdrop > *");

  site.inert = true;

  let finished = false;
  let repairing = false;
  let autoFix: gsap.core.Tween | undefined;
  let statusLoop: gsap.core.Timeline | undefined;
  let repairTl: gsap.core.Timeline | undefined;

  // ---------------------------------------------------------------------------
  // 1 + 2. The crash and the stuck loader: one timeline.
  // ---------------------------------------------------------------------------
  const progress = { value: 0 };
  const renderProgress = () => {
    fill.style.transform = `scaleX(${progress.value / 100})`;
    pct.textContent = `${Math.floor(progress.value)}%`;
  };

  const tl = gsap.timeline({ delay: 0.35 });

  lines.forEach((line, i) => {
    const text = line.dataset.text ?? "";
    const typed = { n: 0 };
    const node = line.appendChild(document.createTextNode(""));
    const isError = line.classList.contains("intro__line--error");
    tl.call(() => line.append(caret))
      .to(typed, {
        n: text.length,
        duration: isError ? 0.3 : Math.min(0.45, text.length * 0.015),
        ease: "none",
        onUpdate: () => {
          node.textContent = text.slice(0, Math.round(typed.n));
        },
      })
      .to({}, { duration: i === lines.length - 2 ? 0.4 : 0.1 });

    if (isError) {
      tl.call(() => line.classList.add("glitch"))
        // A couple of slow jitters (well under 3 per second).
        .to(lines, { x: () => gsap.utils.random(-6, 6), duration: 0.08, ease: "steps(1)" }, "+=0.1")
        .to(lines, { x: 0, duration: 0.08, ease: "steps(1)" }, "+=0.35")
        .to(lines[1], { x: 4, skewX: -8, duration: 0.08, ease: "steps(1)" }, "+=0.15")
        .to(lines[1], { x: 0, skewX: 0, duration: 0.08, ease: "steps(1)" }, "+=0.35");
    }
  });

  // Loader fades in while the jitter is still settling.
  tl.to(loader, { opacity: 1, duration: 0.3 }, "-=0.4")
    .call(startStatusMessages)
    .to(progress, { value: 90, duration: 0.9, ease: "power2.out", onUpdate: renderProgress })
    .to(progress, { value: 99, duration: 1.1, ease: "power4.out", onUpdate: renderProgress })
    .set(fixBtn, { visibility: "visible" }, "+=0.4")
    .to(fixBtn, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" })
    .call(() => {
      // Auto-fix if the visitor doesn't click.
      autoFix = gsap.delayedCall(2.5, runRepair);
    });

  function startStatusMessages() {
    let i = 0;
    msg.textContent = STATUS_MESSAGES[0];
    statusLoop = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });
    statusLoop
      .to(msg, { opacity: 0, duration: 0.2 }, "+=0.2")
      .call(() => {
        i = (i + 1) % STATUS_MESSAGES.length;
        msg.textContent = STATUS_MESSAGES[i];
      })
      .to(msg, { opacity: 1, duration: 0.2 });
  }

  // ---------------------------------------------------------------------------
  // 3. The repair: errors scatter into fragments, glass panels assemble.
  // ---------------------------------------------------------------------------
  function runRepair() {
    if (repairing || finished) return;
    repairing = true;
    tl.pause();
    autoFix?.kill();
    statusLoop?.kill();
    fixBtn.disabled = true;

    lines.forEach((l) => l.classList.remove("glitch"));
    caret.remove();

    const split = SplitText.create([...lines, msg, pct], { type: "chars" });
    const panels = gsap.utils.toArray<HTMLElement>("[data-repair]");
    const heroName = document.querySelector<HTMLElement>("[data-scramble]");

    // Hand visibility over from the CSS gate to GSAP; keep the overlay mounted.
    gsap.set([site, ...backdropLayers], { opacity: 0 });
    gsap.set(panels, { opacity: 0, scale: 0.96, filter: "blur(20px)" });
    intro.style.setProperty("--curtain", "1");
    root.classList.add("intro-repairing");
    root.classList.remove("intro-on");

    repairTl = gsap.timeline({ onComplete: finish });
    repairTl
      .to(fixBtn, { opacity: 0, scale: 0.9, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, 0)
      .to(
        split.chars,
        {
          x: () => gsap.utils.random(-260, 260),
          y: () => gsap.utils.random(-160, 160),
          rotation: () => gsap.utils.random(-120, 120),
          filter: "blur(8px)",
          opacity: 0,
          duration: 1.0,
          ease: "power2.out",
          stagger: { amount: 0.35, from: "random" },
        },
        0,
      )
      .to(fill, { scaleX: 0, opacity: 0, duration: 0.6, ease: "power3.in" }, 0.1)
      // The black curtain is the overlay's ::before; fade it through a CSS variable.
      .to(intro, { "--curtain": 0, duration: 0.9, ease: "power2.inOut" }, 0.3)
      .to(site, { opacity: 1, duration: 0.6, ease: "none" }, 0.35)
      .to(backdropLayers, { opacity: 1, duration: 1.4, ease: "power1.inOut", stagger: 0.1 }, 0.3)
      .to(
        panels,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.08,
        },
        0.5,
      );

    if (heroName) repairTl.add(scramble(heroName), 0.55);
  }

  // ---------------------------------------------------------------------------
  // Cleanup: shared by the end of the repair and by "Skip intro".
  // ---------------------------------------------------------------------------
  function finish() {
    if (finished) return;
    finished = true;
    tl.kill();
    autoFix?.kill();
    statusLoop?.kill();
    repairTl?.kill();

    const panels = gsap.utils.toArray<HTMLElement>("[data-repair]");
    const heroName = document.querySelector<HTMLElement>("[data-scramble]");
    // Leftover filter/opacity would break backdrop-filter on the glass, so clear them.
    gsap.set([site, ...panels, ...backdropLayers], { clearProps: "opacity,transform,filter,scale" });
    if (heroName) {
      heroName.textContent = heroName.dataset.scramble ?? heroName.textContent;
      heroName.classList.remove("is-mono");
    }

    root.classList.remove("intro-on", "intro-repairing");
    site.inert = false;
    onDone();

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    document.dispatchEvent(new CustomEvent("intro:done"));
  }

  fixBtn.addEventListener("click", runRepair);
  skipBtn.addEventListener("click", () => {
    finish();
    document.getElementById("main")?.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape" && !finished) {
      finish();
      document.removeEventListener("keydown", onKey);
    }
  });
}

/** Monospace noise resolves into the real name, then the font swaps to the grotesk. */
function scramble(el: HTMLElement) {
  const target = el.dataset.scramble ?? el.textContent ?? "";
  const state = { p: 0 };
  el.classList.add("is-mono");

  return gsap
    .timeline()
    .to(state, {
      p: 1,
      duration: 0.9,
      ease: "power1.inOut",
      onUpdate: () => {
        const revealed = Math.floor(state.p * target.length);
        let out = "";
        for (let i = 0; i < target.length; i++) {
          const ch = target[i];
          out +=
            i < revealed || ch === " "
              ? ch
              : SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
        }
        el.textContent = out;
      },
    })
    .to(el, { filter: "blur(6px)", opacity: 0.6, duration: 0.12, ease: "power1.in" })
    .call(() => el.classList.remove("is-mono"))
    .to(el, { filter: "blur(0px)", opacity: 1, duration: 0.35, ease: "power2.out", clearProps: "filter,opacity" });
}
