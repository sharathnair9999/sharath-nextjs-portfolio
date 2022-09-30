import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Experience } from "../typings";

type Props = {
  experiences: Experience[];
};

const WorkExperience = ({ experiences }: Props) => {
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

  const setExperienceCardWidth = (width: number) => {
    if (width < 600) {
      return 100;
    }
    if (width >= 500 && width < 900) {
      return 100;
    }
    if (width >= 900) {
      return 70;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left px-10 pt-20 justify-evenly mx-auto items-center"
    >
      <h3 className="section-title">Experience</h3>
      {/* <div className="flex max-h-screen space-x-5 overflow-x-scroll w-full mt-10 py-10 px-2 hidden-scrollbar snap-x snap-mandatory"> */}
      <Carousel
        swipeScrollTolerance={20}
        autoFocus={true}
        centerMode={true}
        className="w-[22rem] md:w-9/12  overflow-hidden lg:w-full"
        centerSlidePercentage={setExperienceCardWidth(windowDimensions.width)}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {experiences?.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </Carousel>
      {/* </div> */}
    </motion.div>
  );
};

export default WorkExperience;
