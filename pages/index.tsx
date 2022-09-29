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

interface Props {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Technology[];
  projects: Project[];
  socials: Social[];
}

const Home: NextPage<Props> = ({
  pageInfo,
  skills,
  projects,
  experiences,
  socials,
}: Props) => {
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

Home.getInitialProps = async (context: any) => {
  const { req } = context;
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
