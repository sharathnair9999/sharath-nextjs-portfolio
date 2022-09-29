import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import About from "../components/About";
import Contact from "../components/Contact";
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
import { FC } from "react";

interface Props {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Technology[];
  projects: Project[];
  socials: Social[];
}

const Home: FC<Props> = ({
  pageInfo,
  skills,
  projects,
  experiences,
  socials,
}) => {
  return (
    <div className="tw-bg-primary home transition-colors ease-in-out duration-500 h-screen overflow-y-scroll">
      <Head>
        <title>{pageInfo?.name}</title>
      </Head>
      {/* Header */}
      <Header socials={socials} />
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
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Technology[] = await fetchSkills();
  const socials: Social[] = await fetchSocials();
  const projects: Project[] = await fetchProjects();
  return {
    props: {
      pageInfo,
      experiences,
      skills,
      socials,
      projects,
    },
  };
};
