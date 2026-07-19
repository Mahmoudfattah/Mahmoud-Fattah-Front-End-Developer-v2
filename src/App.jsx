import { useEffect, useState, lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";

import { ArrowUpWideNarrow } from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import Hero from "./components/pages/Hero";

import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import Navbar from "./components/pages/Navbar";
import Navbar2 from "./components/pages/Navbar2";
import Background from "./components/pages/Background";
import { PageReveal, Reveal } from "./components/PageReveal";
import { ThemeProvider } from "./context/ThemeContext";
import Blog from "./components/pages/Blog";
import Cursor from "./components/pages/Cursor";

const About = lazy(() => import("./components/pages/About"));
const Projects = lazy(() => import("./components/pages/Projects"));
const Skills = lazy(() => import("./components/pages/Skills"));
const ContributionCalendar = lazy(() => import("./components/pages/ContributionCalendar"));
const LifeInSquares = lazy(() => import("./components/pages/LifeInSquares"));
const WorkExperience = lazy(() => import("./components/pages/WorkExperience"));
const Education = lazy(() => import("./components/pages/Education"));
const ContactBubbles = lazy(() => import("./components/pages/ContactBubbles"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-SSNQNK4YTD";
    ReactGA.initialize(gaId);
    ReactGA.send("pageview");
  }, []);

  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Wait, come back !" : originalTitle;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0d0d0d",
              color: "#66d9ff",
              border: "1px solid #3fc3ff",
              fontWeight: "bold",
            },
            success: { iconTheme: { primary: "#00bcd4", secondary: "#0d0d0d" } },
            error: { iconTheme: { primary: "#ff007a", secondary: "#0d0d0d" } },
          }}
        />
        <main className=" font-sans antialiased max-w-[52rem] mx-auto py-12 sm:py-18 px-6  flex flex-col min-h-dvh space-y-10 mt-6 md:mt-0">
          <Background />

          <Navbar />
          <Navbar2 />

          <PageReveal className="flex flex-col space-y-10">
            <Reveal>
              <Hero />
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <ContributionCalendar />
              </Suspense>
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <About />
              </Suspense>
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <LifeInSquares />
              </Suspense>
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <WorkExperience />
              </Suspense>
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <Education />
              </Suspense>
            </Reveal>
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <Skills />
              </Suspense>
            </Reveal>
                {/* <Suspense fallback={<SectionFallback />}>
                  <Blog />
                </Suspense> */}
            <Reveal>
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
            </Reveal>
          </PageReveal>
          <Reveal>
            <div ref={ref}>
              <Suspense fallback={<SectionFallback />}>
                <ContactBubbles />
              </Suspense>
            </div>
          </Reveal>
          {/* <Cursor /> */}
        </main>

        <div className="fixed bottom-[6px] md:bottom-[-10px] left-[14px] pb-2 z-[9999]">
          {visible && (
            <motion.button
              aria-label="Back to top"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.1 }}
              className="relative group  rounded-full flex items-center justify-center  transition-colors shadow-lg overflow-hidden"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUpWideNarrow className="w-6 h-6 md:w-9 md:h-9 text-cyan-500 group-hover:scale-110 transition-transform duration-300 ease-in-out" />
            </motion.button>
          )}
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;