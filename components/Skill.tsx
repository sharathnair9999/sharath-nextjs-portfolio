import React from "react";
import { motion } from "framer-motion";
import { Technology } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  directionLeft?: boolean;
  skill: Technology;
};

const Skill = ({ directionLeft, skill }: Props) => {
  return (
    <div className="p-1 hover:bg-gray_800/30 shadow-md shadow-gray_800/80 rounded-2xl transition-colors duration-300 relative flex cursor-pointer">
      <motion.img
        initial={{ x: directionLeft ? -100 : 100, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-16 w-16 lg:h-20 lg:w-20 rounded-2xl p-1 border-gray-500 object-fill filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill.image).url()}
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out  group-hover:bg-white h-14 w-14  rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-xl font-bold text-black opacity-100">100%</p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
