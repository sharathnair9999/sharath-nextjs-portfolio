import React from "react";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
type Props = {};

const Projects = (props: Props) => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <div className="h-screen relative max-w-full overflow-hidden text-left flex flex-col md:flex-row justify-evenly mx-auto items-center z-20">
      <h3 className="section-title">Projects</h3>

      <Carousel
        autoPlay={true}
        thumbWidth={50}
        showStatus={false}
        showIndicators={false}
        autoFocus={true}
        centerMode={true}
        centerSlidePercentage={100}
        className="mt-20 z-10"
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {projects.map((project, i) => (
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
            className="shadow-xl rounded-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/sharath-media-library/image/upload/v1663439555/portfolio/social_ease_preview-removebg-preview_zlsctx.png"
              alt="socialmedia"
              className="max-w-xs md:max-w-sm lg:max-w-sm"
            />
            <div className="space-y-10 px-0 md:px-10 max-w-6xl ">
              <h4 className="text-3xl font-semibold text-center">
                <span>
                  Case Study {i + 1} of {projects.length} :{" "}
                </span>
                Social Ease
              </h4>
              <p className="dark:text-gray_200 text-sm lg:text-lg max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum facilis officiis sapiente error quos quibusdam
                adipisci sit. Facilis distinctio ipsum eligendi fugit aut
                nostrum quo recusandae, aspernatur quidem soluta eveniet?
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