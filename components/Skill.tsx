import React from "react";
import { motion } from "framer-motion";
import { Technology } from "../typings";
import { urlFor } from "../sanity";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";

type Props = {
  directionTop?: boolean;
  skill: Technology;
};

const Skill = ({ directionTop, skill }: Props) => {
  return (
    <div className="p-1 hover:bg-gray_800/30 shadow-md bg-white/70 dark:bg-transparent shadow-gray_800/80 rounded-2xl transition-colors duration-300 relative flex cursor-pointer">
      <motion.img
        initial={{
          y: directionTop ? -100 : 100,
          opacity: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-16 w-16 lg:h-20 lg:w-20 rounded-2xl p-1 border-gray-500 object-fill filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill.image).url()}
      />
    </div>
  );
};

export default Skill;
