import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type Props = {};

const WorkExperience = (props: Props) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      const getWindowDimensions = () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      };
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowDimensions.width, windowDimensions.height]);
  console.log(windowDimensions);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen  flex relative flex-col text-center md:text-left md:flex-row  px-10 justify-evenly  mx-auto items-center"
    >
      <h3 className="section-title">Experience</h3>
      {/* <div className="flex max-h-screen space-x-5 overflow-x-scroll w-full mt-10 py-10 px-2 hidden-scrollbar snap-x snap-mandatory"> */}
      <Carousel
        autoPlay={true}
        swipeScrollTolerance={20}
        autoFocus={true}
        centerMode={true}
        className="mt-32 w-80 lg:w-full"
        centerSlidePercentage={windowDimensions.width > 768 ? 60 : 95}
        showStatus={false}
        showIndicators={false}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </Carousel>
      {/* </div> */}
    </motion.div>
  );
};

export default WorkExperience;
