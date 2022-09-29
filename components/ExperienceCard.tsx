import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Experience } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  experience: Experience;
};

const ExperienceCard = ({ experience }: Props) => {
  const hello = "hello";
  return (
    <article className="px-4 shadow-2xl md:px-5 flex h-[80%] mx-4 flex-col dark:text-gray_100 rounded-lg py-6 items-start space-y-4 bg-gray_800  overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 w-full">
        <motion.img
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 1.2 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="exp-company rounded-full w-24 h-24 md:w-32 md:h-32 object-cover mx-auto lg:mx-1 lg:text-left"
          src={urlFor(experience?.companyImage).url()}
          alt={experience?.company}
        />
        <div className=" flex flex-col items-start space-y-3">
          <h4 className="text-lg lg:text-3xl font-light">
            {experience?.jobTitle}
          </h4>
          <p className="font-bold text-md lg:text-lg my-2">
            {experience?.company}
          </p>
          <span className="text-xs lg:text-md pt-2 font-light">Tech Stack</span>
          <div className="flex justify-start items-center gap-3">
            {experience.technologies.map((tech) => (
              <div
                className="cursor-pointer rounded-2xl shadow-gray_900 hover:scale-105 transition-all hover:bg-gray_700/20 shadow-sm hover:shadow-md"
                key={tech._id}
              >
                <img
                  src={urlFor(tech.image).url()}
                  alt={tech.title}
                  className={`h-10 rounded-2xl w-10 lg:w-14 lg:h-14 p-px lg:p-1 `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="uppercase py-2 text-sm lg:text-lg text-gray-300">
        Started work ... - Ended.{" "}
      </p>
      <ul className="list-disc pl-4 text-md space-y-2 ml-5 text-left h-56 md:h-60 scrollbar-thumb-blue_00 scrollbar-track-gray_700 overflow-y-auto scrollbar-track-rounded-sm scrollbar-thumb-rounded-sm scrollbar-thin">
        {experience?.points
          ?.filter((point) => point.trim())
          .map((point) => (
            <li key={point}>{point}</li>
          ))}
      </ul>
    </article>
  );
};

export default React.memo(ExperienceCard);
