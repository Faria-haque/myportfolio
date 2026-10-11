import Link from "next/link";
import { site } from "@/data/site";
import "@/styles/components/nav.css";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#changelog", label: "About" },
  { href: "/#known-issues", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="nav">
      <nav className="nav__inner glass" aria-label="Primary">
        <Link className="nav__brand" href="/" aria-label={`${site.name}, home`}>
          <span className="nav__name">{site.name}</span>
          <span className="nav__name--short" aria-hidden="true">
            {site.name.split(" ")[0]}
          </span>
          <span className="nav__ver mono">v3.0</span>
        </Link>
        <ul className="nav__links" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer container">
      <p className="mono muted">
        © {year} {site.name} · build passing · 0 known regressions
      </p>
      <ul className="footer__links" role="list">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} rel="me noopener" target="_blank">
              {s.label}
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${site.email}`}>Email</a>
        </li>
      </ul>
    </footer>
  );
}
