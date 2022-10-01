import Head from "next/head";
import About from "../components/About";
import Contact from "../components/Contact";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";
import { Experience, PageInfo, Project, Social, Technology } from "../typings";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchExperiences } from "../utils/fetchExperiences";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchProjects } from "../utils/fetchProjects";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { AppContext } from "next/app";

interface Props {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Technology[];
  projects: Project[];
  socials: Social[];
}

const Home = ({
  pageInfo,
  skills,
  projects,
  experiences,
  socials,
}: Props): JSX.Element => {
  const [isDark, setIsDark] = useState<null | boolean>(null);
  useEffect(() => {
    if (typeof window !== undefined) {
      ((theme = "dark") => {
        document.documentElement.classList.add(theme);
        setIsDark(theme === "dark");
      })(localStorage.getItem("portfolioTheme") ?? "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      setIsDark((state) => !state);
      localStorage?.setItem("portfolioTheme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark((state) => !state);
      localStorage?.setItem("portfolioTheme", "dark");
      document.documentElement.classList.add("dark");
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (typeof window !== undefined) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <Head>
        <title>{pageInfo?.name}</title>
      </Head>
      <motion.div
        ref={ref}
        style={{ scaleX }}
        className="progress-bar"
      ></motion.div>
      <div className="relative tw-bg-primary home transition-colors ease-in-out duration-500 overflow-y-scroll">
        {/* Header */}
        <Header
          isDark={isDark}
          switchTheme={toggleDarkMode}
          socials={socials}
        />
        {/* Hero */}
        <section id="hero">
          <Hero pageInfo={pageInfo} />
        </section>
        {/* About */}
        <section id="about">
          <About pageInfo={pageInfo} />
        </section>
        {/* Experience */}
        <section id="experience">
          <WorkExperience experiences={experiences} />
        </section>
        {/* Skills */}
        <section id="skills">
          <Skills skills={skills} />
        </section>
        {/* Projects */}
        <section id="projects">
          <Projects projects={projects} />
        </section>

        {/* Contact Me */}
        <section id="contact">
          <Contact />
        </section>
        <div
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full animate-bounce fixed z-[100] bottom-10 md:bottom-10 cursor-pointer shadow-md left-[85%] lg:left-[90%]"
        >
          <ArrowUpCircleIcon className="text-gray_800 rounded-full dark:text-gray_200" />
        </div>
      </div>
    </>
  );
};

export default Home;

Home.getInitialProps = async ({ req }: any) => {
  let host: string = "";
  if (req) {
    host = `http://${req.headers.host}`; // will give you localhost:3000
  }

  const pageInfo: PageInfo = await fetchPageInfo(host);
  const experiences: Experience[] = await fetchExperiences(host);
  const skills: Technology[] = await fetchSkills(host);
  const socials: Social[] = await fetchSocials(host);
  const projects: Project[] = await fetchProjects(host);
  return {
    pageInfo,
    experiences,
    skills,
    socials,
    projects,
  };
};
// export const getStaticProps: GetStaticProps<Props> = async () => {};
