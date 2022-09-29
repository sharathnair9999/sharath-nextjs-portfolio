import React from "react";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Project } from "../typings";
import { urlFor } from "../sanity";
type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  const dateSortProjects = (project1: Project, project2: Project) => {
    const d1 = new Date(project1._createdAt);
    const d2 = new Date(project2._createdAt);
    if (d1 > d2) {
      return 1;
    }
    if (d1 < d2) {
      return -1;
    }
    return 0;
  };

  return (
    <div className="h-screen relative max-w-full overflow-hidden text-left flex flex-col md:flex-row justify-evenly mx-auto items-center z-20">
      <h3 className="section-title">Projects</h3>

      <Carousel
        showStatus={false}
        showIndicators={false}
        autoFocus
        centerMode
        showThumbs={false}
        centerSlidePercentage={100}
        className="mt-20 z-10 mx-4"
        preventMovementUntilSwipeScrollTolerance
      >
        {projects?.sort(dateSortProjects).map((project, i) => (
          <motion.div
            initial={{
              y: -300,
              opacity: 0,
            }}
            transition={{
              duration: 1.2,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            key={i}
            className="shadow-xl rounded-md p-2 h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a
              href={project.linkToBuild}
              target={"_blank"}
              className="max-w-xs relative lg:max-w-md flex mx-auto hover:scale-105 transition"
            >
              <img
                src={urlFor(project.image).url()}
                alt={project.title}
                className="w-full rounded-md"
              />
              <div className="absolute w-full h-full hover:bg-gray_900/10 rounded-lg hover:shadow-md transition-colors z-10 top-0 left-0"></div>
            </a>
            <div className="space-y-4 mt-4 px-0 md:px-10 mx-auto max-w-6xl">
              <h4 className="text-3xl dark:text-gray_100 font-semibold text-center">
                {project.title}
              </h4>
              <p className="dark:text-gray_400 font-medium text-sm lg:text-lg max-w-2xl mx-auto">
                {project?.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </Carousel>
      <div className="w-full absolute top=[30%] left-0 bg-blue_500/20 h-[500px] -skew-y-12" />
    </div>
  );
};

export default Projects;
