import React from "react";
import { motion } from "framer-motion";

type Props = {
  directionLeft?: boolean;
};

const Skill = ({ directionLeft }: Props) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{ x: directionLeft ? -100 : 100, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-14 w-14 rounded-full border-gray-500 object-cover filter group-hover:grayscale transition duration-300 ease-in-out"
        src="https://res.cloudinary.com/sharath-media-library/image/upload/v1663430842/portfolio/sanity_logo_n9ae2l.png"
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
