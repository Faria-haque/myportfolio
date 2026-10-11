// The living backdrop the glass refracts: drifting blobs + giant outlined type.

export default function Backdrop({ text = "404" }: { text?: string }) {
  const repeated = Array(6).fill(text).join(" ");
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="blob blob--a" />
      <div className="blob blob--b" />
      <div className="blob blob--c" />
      <div className="outline-type outline-type--1">
        {repeated} {repeated}
      </div>
      <div className="outline-type outline-type--2">
        {repeated} {repeated}
      </div>
    </div>
  );
}

/** Refraction map for .glass--liquid (Chromium enhancement). */
export function LiquidFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="liquid" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={7} result="noise" />
        <feGaussianBlur in="noise" stdDeviation={2} result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale={45} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
