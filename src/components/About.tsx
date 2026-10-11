import { changelog, knownIssues, skills } from "@/data/site";
import "@/styles/components/about.css";

export function Changelog() {
  return (
    <section id="changelog" className="section container" aria-labelledby="changelog-title">
      <header className="section-head reveal">
        <h2 id="changelog-title">
          <span className="label">{"// about"}</span>Changelog
        </h2>
        <p>My career, written as release notes. Newest version first.</p>
      </header>

      <ol className="log" role="list">
        {changelog.map((entry, i) => (
          <li className="log__entry reveal" key={entry.version}>
            <div className="log__meta">
              <span className="log__ver">{entry.version}</span>
              <span className="mono muted">{entry.date}</span>
              {i === 0 && <span className="tag">latest</span>}
            </div>
            <div className="log__body">
              <h3 className="log__title">{entry.title}</h3>
              <ul className="log__notes">
                {entry.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function KnownIssues() {
  return (
    <section id="known-issues" className="section container" aria-labelledby="issues-title">
      <header className="section-head reveal">
        <h2 id="issues-title">
          <span className="label">{"// skills"}</span>Known Issues
        </h2>
        <p>Strengths, filed as bugs. None of them are getting fixed.</p>
      </header>

      <ul className="issues" role="list">
        {knownIssues.map((issue) => (
          <li className="issue reveal" key={issue.id}>
            <span className="issue__id mono">#{issue.id}</span>
            <p className="issue__title">{issue.title}</p>
            <span className="issue__status mono">
              <span className="sr-only">Status: </span>
              {issue.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="stack glass glass--strong reveal">
        <h3 className="stack__title">Toolkit</h3>
        <dl className="stack__groups">
          {skills.map((s) => (
            <div className="stack__group" key={s.group}>
              <dt className="mono muted">{s.group}</dt>
              {s.items.map((item) => (
                <dd key={item}>{item}</dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
