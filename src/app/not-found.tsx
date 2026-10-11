import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import "@/styles/components/pages.css";

export const metadata: Metadata = { title: "Page not found" };

// The one page that's suspiciously polished: no glitches anywhere.
export default function NotFound() {
  return (
    <>
      <Backdrop text="200" />
      <section className="nf container" aria-labelledby="nf-title">
        <div className="nf__panel glass glass--liquid">
          <p className="mono muted">error 404 · page not found</p>
          <h1 id="nf-title" className="nf__title">
            Ironically, this page works fine.
          </h1>
          <p className="nf__copy muted">
            The page you were after doesn&apos;t exist, but everything here is rendering perfectly. Zero glitches.
            Suspicious, honestly.
          </p>
          <Link className="btn" href="/">
            Back to the homepage
          </Link>
        </div>
      </section>
    </>
  );
}
