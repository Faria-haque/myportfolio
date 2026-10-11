import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import { Changelog, KnownIssues } from "@/components/About";
import Contact from "@/components/Contact";
import { site } from "@/data/site";

export default function Home() {
  if (site.minimal) {
    return (
      <>
        <Backdrop text="404" />
        <Hero />
      </>
    );
  }

  return (
    <>
      <Backdrop text="404" />
      <Hero />
      <Work />
      <Changelog />
      <KnownIssues />
      <Contact />
    </>
  );
}
