import { MotionConfig } from "framer-motion";
import BackToTop from "@/components/BackToTop";
import IosHelp from "@/components/IosHelp";
import ScrollProgress from "@/components/ScrollProgress";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";
import { useSectionRouting } from "@/hooks/useSectionRouting";
import { useTouchHover } from "@/hooks/useTouchHover";
import { SECTION_PATHS } from "@/lib/routing";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Focus from "@/sections/Focus";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Nav from "@/sections/Nav";
import NotFound from "@/sections/NotFound";
import Numbers from "@/sections/Numbers";
import Principles from "@/sections/Principles";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import { PwaProvider } from "@/usePwaInstall.jsx";

const KNOWN_PATHS = [
  "/",
  "/index.html",
  ...SECTION_PATHS.filter((x) => x !== "home").map((x) => `/${x}`),
];

export default function App() {
  const known = KNOWN_PATHS.includes(
    window.location.pathname.replace(/(.)\/+$/, "$1"),
  );
  useSectionRouting();
  useCardSpotlight();
  useTouchHover();
  if (!known) return <NotFound />;
  return (
    <MotionConfig reducedMotion="user">
      <PwaProvider>
        <ScrollProgress />
        <Nav />
        <main className="xl:pb-0">
          <Hero />
          <About />
          <Focus />
          <Skills />
          <Principles />
          <Projects />
          <Numbers />
          <Education />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <IosHelp />
      </PwaProvider>
    </MotionConfig>
  );
}
