"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import "@/styles/components/contact.css";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[required]")];
    const bad = fields.filter((f) => !f.checkValidity());
    setInvalid(bad.map((f) => f.name));
    if (bad.length) {
      setStatus(`Validation failed: ${bad.length} field(s) need attention.`);
      bad[0].focus();
      return;
    }

    const data = new FormData(form);

    if (!site.formEndpoint) {
      const subject = `[${data.get("severity")}] Issue from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Opening your mail client to file the issue…");
      return;
    }

    setStatus("Submitting…");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus(`Issue #${Math.floor(100 + Math.random() * 900)} filed. I'll get back to you soon.`);
    } catch {
      setStatus(`Ironically, that failed. Email ${site.email} instead.`);
    }
  }

  const invalidProp = (name: string) => (invalid.includes(name) ? true : undefined);

  return (
    <section id="contact" className="section container" aria-labelledby="contact-title">
      <header className="section-head reveal">
        <h2 id="contact-title">
          <span className="label">{"// contact"}</span>Report a Bug
        </h2>
        <p>
          Got a problem that needs designing, or a project that needs building? File an issue and I&apos;ll get back to
          you.
        </p>
      </header>

      <form className="tracker glass glass--strong reveal" onSubmit={onSubmit} noValidate>
        <div className="tracker__bar mono">
          <span>new issue</span>
          <span className="muted">assignee: {site.name.toLowerCase()}</span>
        </div>

        <div className="tracker__grid">
          <div className="field">
            <label htmlFor="f-name">Name</label>
            <input id="f-name" name="name" type="text" autoComplete="name" required aria-invalid={invalidProp("name")} />
          </div>
          <div className="field">
            <label htmlFor="f-email">Email</label>
            <input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={invalidProp("email")} />
          </div>
          <div className="field field--full">
            <label htmlFor="f-severity">Severity</label>
            <select id="f-severity" name="severity" defaultValue="Medium: I have a project">
              <option>Low: just saying hi</option>
              <option>Medium: I have a project</option>
              <option>High: it needed to ship yesterday</option>
            </select>
          </div>
          <div className="field field--full">
            <label htmlFor="f-message">Describe the problem (or project)</label>
            <textarea id="f-message" name="message" rows={6} required aria-invalid={invalidProp("message")} />
          </div>
        </div>

        <div className="tracker__foot">
          <p className="tracker__status mono" role="status" aria-live="polite">
            {status}
          </p>
          <button className="btn btn--red" type="submit">
            Submit issue
          </button>
        </div>
      </form>

      <p className="contact__alt muted">
        Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a> (yes, it really ends in 404)
      </p>
    </section>
  );
}
