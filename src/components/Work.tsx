import { projects } from "@/data/site";
import ProjectCard from "./ProjectCard";
import "@/styles/components/work.css";

export default function Work() {
  return (
    <section id="work" className="section container" aria-labelledby="work-title">
      <header className="section-head reveal">
        <h2 id="work-title">
          <span className="label">{"// selected work"}</span>Work
        </h2>
        <p>Found 0 bugs in these projects. Found several in my sense of humor.</p>
      </header>

      <ul className="work" role="list">
        {projects.map((p, i) => (
          <li className="reveal" key={p.slug}>
            <ProjectCard project={p} index={i} total={projects.length} />
          </li>
        ))}
      </ul>
    </section>
  );
}
