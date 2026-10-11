import { site } from "@/data/site";
import "@/styles/components/hero.css";

export default function Hero() {
  if (site.minimal) {
    return (
      <section className="hero hero--minimal container" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero__name" aria-label={site.name}>
          {/* The intro scrambles this text, so keep it out of the accessibility tree. */}
          <span data-scramble={site.name} aria-hidden="true">
            {site.name}
          </span>
        </h1>
        <p className="hero__tagline" data-repair>
          {site.minimalLine}
        </p>
      </section>
    );
  }

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <p className="hero__status mono" data-repair>
        <span className="hero__dot" aria-hidden="true" />
        status: 200 OK
      </p>

      <h1 id="hero-title" className="hero__name" aria-label={site.name}>
        {/* The intro scrambles this text, so keep it out of the accessibility tree. */}
        <span data-scramble={site.name} aria-hidden="true">
          {site.name}
        </span>
      </h1>

      <div className="hero__panel glass glass--liquid" data-repair>
        <p className="hero__role mono">
          {site.role} · {site.location}
        </p>
        <p className="hero__pos">{site.positioning}</p>
        <p className="hero__wink muted">{site.wink}</p>
        <div className="hero__cta">
          <a className="btn" href="#work">
            See the work <span aria-hidden="true">↓</span>
          </a>
          <a className="hero__link" href="#contact">
            Report a bug (hire me)
          </a>
        </div>
      </div>
    </section>
  );
}
