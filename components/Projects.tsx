import React from "react";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Project } from "../typings";
import { setExperienceCardWidth, urlFor } from "../sanity";
import { SocialIcon } from "react-social-icons";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  const dimensions = useWindowDimensions(null);
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
    <div className="h-screen w-full relative overflow-hidden text-left flex flex-col justify-center mx-auto items-center z-20">
      <h3 className="section-title">Projects</h3>

      <Carousel
        showStatus={false}
        showIndicators={false}
        // emulateTouch
        autoFocus
        centerMode
        showThumbs={false}
        centerSlidePercentage={setExperienceCardWidth(dimensions?.width)}
        className="mt-20 z-10 w-full overflow-hidden"
        preventMovementUntilSwipeScrollTolerance
      >
        {projects?.sort(dateSortProjects).map((project, i) => (
          <motion.div
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 1.2,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            key={i}
            className="shadow-2xl  mx-3  my-2 rounded-lg px-2 py-10 h-[90%]"
          >
            <a
              href={project.linkToBuild}
              target={"_blank"}
              className="max-w-xs relative flex mx-auto hover:scale-105 transition"
            >
              <img
                src={urlFor(project.image).url()}
                alt={project.title}
                className=" rounded-md"
              />
            </a>
            <div className="space-y-4 mt-4 mx-auto ">
              <p className="flex justify-center items-center gap-4">
                <a
                  href={project?.linkToBuild}
                  target="_blank"
                  className="text-3xl underline flex justify-center items-center decoration-blue_600/70 underline-offset-8 dark:text-gray_100 font-semibold text-center"
                >
                  <span className="-mt-2">{project?.title}</span>
                </a>
                <a
                  href={project?.linkToRepo}
                  target="_blank"
                  className="flex justify-center items-center"
                >
                  <img
                    className="w-8 h-8 object-cover "
                    src="https://res.cloudinary.com/sharath-media-library/image/upload/v1664616751/portfolio/github_1_lldh6d.svg"
                    alt="github"
                  />
                </a>
              </p>
              <p className="dark:text-gray_200 font-normal text-gray_900 text-justify text-sm lg:text-lg max-w-2xl mx-auto">
                {project?.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </Carousel>
      <div className="w-full absolute top-[50%] -translate-y-1/2 left-0 bg-blue_500/30 dark:bg-blue_500/20 h-[250px] lg:h-[500px] -skew-y-12 " />
    </div>
  );
};

export default Projects;
