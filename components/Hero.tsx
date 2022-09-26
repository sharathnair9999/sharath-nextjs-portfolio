import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import { motion } from "framer-motion";
type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    words: ["<Sharath_Nair/>", "Software Engineer", "Live for Biryani"],
    loop: true,
    delaySpeed: 200,
  });
  return (
    <div className="min-h-screen flex flex-col items-center space-y-8 justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <motion.img
        initial={{
          opacity: 0,
          scale: 2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        src="https://res.cloudinary.com/sharath-media-library/image/upload/v1663426633/portfolio/sharath2_sn6r9l.jpg"
        alt="Sharath"
        className="h-32 w-32 rounded-full relative mx-auto object-cover"
      />
      <div className="z-20">
        <h2 className="text-xs font-bold md:text-md uppercase text-gray-500 dark:text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          Frontend Engineer
        </h2>
        <h1 className="text-2xl lg:text-4xl font-semibold px-10">
          <span className="italic dark:text-white">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
          <Link href={"#about"}>
            <button className="heroButton">About</button>
          </Link>
          <Link href={"#experience"}>
            <button className="heroButton">Experience</button>
          </Link>
          <Link href={"#skills"}>
            <button className="heroButton">Skills</button>
          </Link>
          <Link href={"#projects"}>
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
