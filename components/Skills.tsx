import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Technology } from "../typings";

type Props = {
  skills: Technology[];
};

const Skills = ({ skills }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left  max-w-[2000px] xl:px-10 h-screen xl:space-y-0 justify-center  mx-auto items-center"
    >
      <h3 className="section-title">Skills</h3>
      <h3 className="uppercase absolute top-36 text-sm text-gray-500 font-semibold">
        Hover over a skill for current proficiency
      </h3>
      <div className="grid grid-cols-3 mt-14  md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 lg:gap-x-10 lg:gap-y-8 ">
        {skills?.map((skill, ind, thisArr) => (
          <Skill
            directionLeft={ind > Math.floor(thisArr.length / 2)}
            key={skill._id}
            skill={skill}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
