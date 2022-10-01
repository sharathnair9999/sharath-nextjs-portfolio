import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Technology } from "../typings";

type Props = {
  skills: Technology[];
};

const Skills = ({ skills }: Props) => {
  const sortSkills = (skill1: Technology, skill2: Technology) => {
    if (skill1.progress < skill2.progress) return 1;
    if (skill1.progress > skill2.progress) return -1;
    return 0;
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left  max-w-[2000px] xl:px-10 lg:h-screen h-fit space-y-6 justify-start lg:justify-evenly   mx-auto items-center"
    >
      <h3 className="section-title">Skills</h3>
      <div className="grid grid-cols-3 mt-14  md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 lg:gap-x-10 lg:gap-y-8 ">
        {skills?.sort(sortSkills).map((skill, ind, thisArr) => (
          <Skill
            directionTop={ind > Math.floor(thisArr.length / 2)}
            key={skill._id}
            skill={skill}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
