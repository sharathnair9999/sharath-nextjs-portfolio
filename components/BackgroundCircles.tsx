import React from "react";
import { motion } from "framer-motion";

type Props = {};

const BackgroundCircles = (props: Props) => {
  const dimensions = [200, 300, 500, 650, 800];
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{ duration: 2.5 }}
      className="relative flex justify-center items-center "
    >
      {dimensions.map((dimension, id) => {
        return (
          <div
            className={`${
              id === 3
                ? "border-blue_600 animate-pulse"
                : "dark:border-heroCircle border-heroCircle/20"
            } ${
              id === 0 && "animate-ping"
            } common-hero-circle h-[${dimension}px] w-[${dimension}px] `}
            key={id}
          ></div>
        );
      })}
      {/* <div className="border border-heroCircle absolute mt-52 h-[200px] w-[200px] rounded-full"></div>
      <div className="border border-heroCircle absolute mt-52 h-[300px] w-[300px] rounded-full"></div>
      <div className="border border-heroCircle absolute mt-52 h-[500px] w-[500px] rounded-full"></div>
      <div className="border border-heroCircle absolute mt-52 h-[650px] w-[650px] rounded-full"></div>
      <div className="border border-heroCircle absolute mt-52 h-[800px] w-[800px] rounded-full"></div> */}
    </motion.div>
  );
};

export default BackgroundCircles;
