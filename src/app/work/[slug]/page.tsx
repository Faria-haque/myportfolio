import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Backdrop from "@/components/Backdrop";
import { projects, site } from "@/data/site";
import "@/styles/components/pages.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || site.minimal) notFound();
  const project = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <Backdrop text={project.year} />
      <article className="case container">
        <Link className="case__back mono" href="/#work">
          ← all work
        </Link>

        <header className="case__head">
          <h1 className="case__title">{project.title}</h1>
          <p className="case__summary">{project.summary}</p>
          <dl className="case__meta glass">
            <div>
              <dt className="mono muted">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="mono muted">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="mono muted">Stack</dt>
              <dd className="case__tags">
                {project.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            {project.award && (
              <div>
                <dt className="mono muted">Recognition</dt>
                <dd>{project.award}</dd>
              </div>
            )}
            {project.link && (
              <div>
                <dt className="mono muted">Live</dt>
                <dd>
                  <a href={project.link}>Visit site ↗</a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <div className="case__media glass reveal" role="img" aria-label={`${project.title} preview placeholder`}>
          <span className="mono muted">[ add a screenshot or video here ]</span>
        </div>

        <section className="case__section reveal" aria-labelledby="challenge">
          <h2 id="challenge">The challenge</h2>
          <p>{project.challenge}</p>
        </section>

        <section className="case__section reveal" aria-labelledby="approach">
          <h2 id="approach">The approach</h2>
          <ol>
            {project.approach.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
        </section>

        <section className="case__section reveal" aria-labelledby="outcome">
          <h2 id="outcome">The outcome</h2>
          <p>{project.outcome}</p>
        </section>

        <Link className="case__next glass reveal" href={`/work/${next.slug}`}>
          <span className="mono muted">next project</span>
          <span className="case__next-title">{next.title} →</span>
        </Link>
      </article>
    </>
  );
}
