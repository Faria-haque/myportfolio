"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/site";
import { prefersReducedMotion } from "@/scripts/motion";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const [glitching, setGlitching] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  // A brief half-second glitch on hover, then it settles.
  const onEnter = () => {
    if (glitching || prefersReducedMotion()) return;
    setGlitching(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setGlitching(false), 520);
  };

  return (
    <Link
      className={`card glass${glitching ? " is-glitching" : ""}`}
      href={`/work/${project.slug}`}
      onMouseEnter={onEnter}
    >
      <span className="card__index mono">
        {pad(index + 1)} / {pad(total)}
      </span>
      <span className="card__year mono">{project.year}</span>
      <h3 className="card__title">
        <span className="glitch-once" data-text={project.title}>
          {project.title}
        </span>
      </h3>
      <p className="card__summary">{project.summary}</p>
      {project.award && <p className="card__award mono">★ {project.award}</p>}
      <span className="card__tags">
        {project.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </span>
      <span className="card__open mono" aria-hidden="true">
        open case study →
      </span>
    </Link>
  );
}
