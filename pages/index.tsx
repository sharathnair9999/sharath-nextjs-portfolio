import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="tw-bg-primary home transition-colors ease-in-out duration-500 h-screen overflow-y-scroll">
      <Head>
        <title>Sharath Nair</title>
      </Head>
      {/* Header */}
      <Header />
      {/* Hero */}
      <section id="hero">
        <Hero />
      </section>
      {/* About */}
      <section id="about">
        <About />
      </section>
      {/* Experience */}
      <section id="experience">
        <WorkExperience />
      </section>
      {/* Skills */}
      <section id="skills">
        <Skills />
      </section>
      {/* Projects */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contact Me */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
