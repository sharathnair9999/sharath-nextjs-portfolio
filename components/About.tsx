import React from "react";
import { motion } from "framer-motion";
type Props = {};

const About = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-center md:justify-evenly space-y-5  mx-auto items-center"
    >
      <h3 className="section-title">About</h3>
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        className="w-48 h-48 -mb-30 md:mb-0 mt-4 flex-shrink-0 rounded-full md:rounded-lg md:w-64 md:h-80  object-cover"
        viewport={{ once: true }}
        src="https://res.cloudinary.com/sharath-media-library/image/upload/v1663415197/portfolio/sharath_x9gvra.png"
      />
      <div className="space-y-4 md:space-y-6 px-0 md:px-10">
        <h4 className="text-2xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-accentColor/50 ">little</span>{" "}
          background
        </h4>
        <p className="text-sm text-white/80">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
          tenetur sunt nulla dolores aspernatur hic officia, ipsum nisi
          excepturi ducimus, totam a? Velit deserunt veniam, praesentium vero
          incidunt molestiae accusantium.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
