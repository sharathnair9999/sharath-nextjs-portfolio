import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const ExperienceCard = (props: Props) => {
  return (
    <article className="px-4 md:px-5 flex  mx-4 flex-col cursor-pointer rounded-lg py-6 items-start space-y-4   bg-[#292929]  transition-opacity duration-200 overflow-hidden lg:opacity-80 opac-100 lg:hover:opacity-100">
      <div className="flex gap-10 h-36">
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
          className="exp-company rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
          src="https://res.cloudinary.com/sharath-media-library/image/upload/v1663428964/portfolio/tcs_logo_ovb4pe.png"
          alt=""
        />
        <div className="main-details flex flex-col items-start space-y-3">
          <h4 className="tex-3xl font-light">Systems Engineer</h4>
          <p className="font-bold text-2xl my-2">TCS</p>
          <div>
            {/* Tech used */}
            {/* Tech used */}
            {/* Tech used */}
          </div>
        </div>
      </div>

      <p className="uppercase py-5 text-gray-300 mx-auto">
        Started work ... - Ended.{" "}
      </p>
      <ul className="list-disc space-y-2 ml-5 text-sm  text-left">
        <li>
          Summary PointsSummary PointsSummary PointsSummary PointsSummary
          PointsSummary Points Summary PointsSummary PointsSummary Points
        </li>
        <li>
          Summary PointsSummary PointsSummary PointsSummary PointsSummary
          PointsSummary Points Summary PointsSummary PointsSummary Points
        </li>
        <li>
          Summary PointsSummary PointsSummary PointsSummary PointsSummary
          PointsSummary Points Summary PointsSummary PointsSummary Points
        </li>
      </ul>
    </article>
  );
};

export default React.memo(ExperienceCard);
